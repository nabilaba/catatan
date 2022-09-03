import {
  Flex,
  Box,
  FormLabel,
  FormControl,
  Stack,
  Button,
  Heading,
  Text,
  Container,
  IconButton,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  AddIcon,
  AttachmentIcon,
  DeleteIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [masukkan, setMasukkan] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      masukkan:
        "Aplikasi Catatan dibuat pada tanggal 3 September 2022\n\n\n- Nabil Aziz Bima Anggita",
      date: "3 September, 2022 - 23:40:10",
    },
  ]);

  const HandleSubmit = (e) => {
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const tgl = new Date();
    setData([
      {
        id: Date.now(),
        masukkan: masukkan,
        date: `${tgl.getDate()} ${
          bulan[tgl.getMonth()]
        }, ${tgl.getFullYear()} - ${tgl.getHours()}:${tgl.getMinutes()}:${tgl.getSeconds()}`,
      },
      ...data,
    ]);
    setMasukkan("");
    setVisible(false);
    e.preventDefault();
  };

  const deleteData = (id) => {
    setData(data.filter((item) => item.id != id));
  };

  return (
    <Container minH={"100vh"} maxW="full" bg="gray.800" color="white" py={5}>
      <HStack justifyContent="space-between" mb={5}>
        <Heading
          fontSize={{ base: "xl", sm: "3xl" }}
          bgGradient="linear(to-l, #cfd9df,#a6c0fe)"
          bgClip="text"
        >
          Catatan
        </Heading>
        <HStack>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton
              colorScheme="pink"
              aria-label="Github"
              icon={<AttachmentIcon />}
              onClick={() => {
                window.open("https://nabilaba.github.io", "_blank");
              }}
            />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton
              colorScheme="blue"
              aria-label="Delete database"
              icon={visible ? <MinusIcon /> : <AddIcon />}
              onClick={() => setVisible(!visible)}
              mr="4"
            />
          </motion.a>
        </HStack>
      </HStack>
      <Flex justify={"center"} direction="column" mt="5">
        <AnimatePresence>
          <motion.div
            key={visible}
            initial={{ height: 0, overflow: "hidden" }}
            animate={{
              height: visible ? "auto" : 0,
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Stack spacing={8} w="full" mb="5">
              <Box pos="relative">
                <Stack
                  as="form"
                  pos="relative"
                  spacing={4}
                  bg="gray.800"
                  rounded="lg"
                  boxShadow="lg"
                  onSubmit={HandleSubmit}
                >
                  <FormControl isRequired>
                    <FormLabel>Kalimat</FormLabel>
                    <Textarea
                      placeholder="Masukkan catatan harian..."
                      name="input"
                      resize={"vertical"}
                      value={masukkan}
                      onChange={(e) => setMasukkan(e.target.value)}
                      minH="250px"
                      whiteSpace={"pre-wrap"}
                    />
                  </FormControl>
                  <Button
                    bgGradient="linear(to-l, #cfd9df,#a6c0fe)"
                    color="black"
                    _hover={{
                      transform: "translateY(-2px)",
                    }}
                    rounded="md"
                    w="100%"
                    type="submit"
                  >
                    Tambahkan
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </motion.div>
        </AnimatePresence>
        <Stack spacing={2}>
          <AnimatePresence>
            {data.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ height: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Stack w="full" key={index}>
                  <Box pos="relative">
                    <Box
                      pos="absolute"
                      top="-2px"
                      right="-2px"
                      bottom="-2px"
                      left="-2px"
                      rounded="lg"
                      bgGradient="linear(to-l, #cfd9df,#a6c0fe)"
                    ></Box>
                    <Box
                      pos="relative"
                      rounded="lg"
                      px={4}
                      py={2}
                      bg="gray.800"
                    >
                      <Flex align="center" justify="space-between">
                        <Box>
                          <Text as="p">{item.date}</Text>
                        </Box>
                        <IconButton
                          colorScheme="blue"
                          aria-label="Delete database"
                          icon={<DeleteIcon />}
                          onClick={() => deleteData(item.id)}
                        />
                      </Flex>
                      <Text as="p" whiteSpace={"pre-wrap"}>
                        {item.masukkan}
                      </Text>
                    </Box>
                  </Box>
                </Stack>
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;
