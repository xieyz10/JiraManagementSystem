import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "conponents/lib";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const confirmDeleteEpic = (id: number) => {
    Modal.confirm({
      title: "确定删除这个任务组吗",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        console.log("id is + " + id);
        deleteEpic({ id }); //这里传入的id是对象
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button
                    onClick={() => confirmDeleteEpic(epic.id)}
                    type={"link"}
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <div>
                    <Link
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      key={task.id}
                    >
                      {task.name}
                    </Link>
                  </div>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};