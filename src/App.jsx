import {
  Flex,
  Stack,
  Container,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { getInitialData } from "./utils";
import ListCatatan from "./components/ListCatatan";
import Navbar from "./components/Navbar";
import FormCatatan from "./components/FormCatatan";

function App() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(getInitialData());
  const [filter, setFilter] = useState("");

  return (
    <Stack minH={"100vh"} bg="gray.800" color="white" py={5}>
      <Container maxW="3xl">
        <Navbar
          visible={visible}
          setVisible={setVisible}
          filter={filter}
          setFilter={setFilter}
        />
        <Divider my={4} />
        <Flex justify={"center"} direction="column" mt="5">
          <FormCatatan
            visible={visible}
            setVisible={setVisible}
            setData={setData}
            data={data}
          />
          <Stack spacing={8}>
            <ListCatatan
              data={data.filter((item) =>
                item.title.toLowerCase().includes(filter.toLowerCase())
              )}
              filter={filter}
              archived={false}
              setData={setData}
            />
            <ListCatatan
              data={data.filter((item) =>
                item.title.toLowerCase().includes(filter.toLowerCase())
              )}
              filter={filter}
              archived={true}
              setData={setData}
            />
          </Stack>
        </Flex>
      </Container>
    </Stack>
  );
}

export default App;
