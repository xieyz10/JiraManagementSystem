import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { useDebounce, useDocumentTitle } from "../../utils/index";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModel, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "conponents/lib";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModel();
  const [param, setParam] = useProjectSearchParams();
  // const [keys,setKeys] = useState<('name'|'personId')[]>(['name','personId'])
  //data:list中的list是别名
  const debouncedParam = useDebounce(param, 200);
  // const {isLoading, error,data:list} = useProjects(useDebounce(param,200))
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  // list?.map(item=>{
  //     item.pin=false
  // })
  const { data: users } = useUsers();
  return (
    <Container>
      <CreateProjectButton>
        <h2>项目列表</h2>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </CreateProjectButton>
      {/* <Helmet>
                <title>项目列表</title>
            </Helmet> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;
const CreateProjectButton = styled(Row)`
  justify-content: space-between;
`;

export default ProjectListScreen;
