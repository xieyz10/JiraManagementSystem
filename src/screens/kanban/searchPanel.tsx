import { Button, Col, Input, Row } from "antd";
import { TaskTypeSelect } from "conponents/task-type-select";
import { UserSelect } from "conponents/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row gutter={0}>
      <Input
        style={{ width: "115px" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        style={{ width: "115px" }}
        defaultOpitionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        style={{ width: "115px" }}
        defaultOpitionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button style={{ width: "115px" }} onClick={reset}>
        清除筛选器
      </Button>
      `
    </Row>
    // <Row gutter={0}>
    //     <Col className="gutter-row" span={3}>
    //         <Input style={{ width: '115px' }}
    //             placeholder={'任务名'}
    //             value={searchParams.name}
    //             onChange={evt => setSearchParams({ name: evt.target.value })} />
    //     </Col>
    //     <Col className="gutter-row" span={3}>
    //         <UserSelect style={{ width: '115px' }} defaultOpitionName={'经办人'} onChange={value => setSearchParams({ processorId: value })} />
    //     </Col>
    //     <Col className="gutter-row" span={3}>
    //         <TaskTypeSelect style={{ width: '115px' }} defaultOpitionName={'类型'} value={searchParams.typeId} onChange={value => setSearchParams({ typeId: value })} />
    //     </Col>
    //     <Col className="gutter-row" span={3}>
    //         <Button style={{ width: '115px' }} onClick={reset}>清除筛选器</Button>
    //     </Col>
    // </Row>
  );
};
