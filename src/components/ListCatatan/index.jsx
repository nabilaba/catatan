import { DeleteIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { showFormattedDate } from "../../utils";

const ListCatatan = ({ data, archived, filter, setData }) => {
  const deleteData = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const archiveData = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, archived: !item.archived } : item
      )
    );
  };

  return (
    <Stack>
      <Heading
        fontSize={{ base: "lg", sm: "2xl" }}
        fontStyle="italic"
        bgGradient="linear(to-l, #cfd9df,#a6c0fe)"
        bgClip="text"
      >
        {archived ? "Diarsipkan" : "Aktif"}
      </Heading>
      <AnimatePresence>
        {data
          .filter((item) => item.archived == archived)
          .map((item) => (
            <motion.div
              key={item.id}
              initial={{ height: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              h="full"
            >
              <Stack w="full" h="full">
                <Box pos="relative" h="full">
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
                    h="full"
                  >
                    <Flex align="center" justify="space-between">
                      <Box>
                        <Heading fontSize="lg">{item.title}</Heading>
                        <Text fontSize="sm" color="gray.400">
                          {showFormattedDate(item.createdAt)}
                        </Text>
                      </Box>
                      <HStack>
                        <IconButton
                          colorScheme="green"
                          aria-label="Archive database"
                          icon={archived ? <UnlockIcon /> : <LockIcon />}
                          onClick={() => archiveData(item.id)}
                        />
                        <IconButton
                          colorScheme="red"
                          aria-label="Delete database"
                          icon={<DeleteIcon />}
                          onClick={() => deleteData(item.id)}
                        />
                      </HStack>
                    </Flex>
                    <Text as="p" whiteSpace={"pre-wrap"}>
                      {item.body}
                    </Text>
                  </Box>
                </Box>
              </Stack>
            </motion.div>
          ))}
      </AnimatePresence>
      {data.filter((item) => item.archived == archived).length == 0 && (
        <Text fontSize="sm" color="gray.400">
          Tidak ada catatan {filter ? `dengan judul "${filter}"` : ""} yang{" "}
          {archived ? "diarsipkan" : "aktif"}
        </Text>
      )}
    </Stack>
  );
};

export default ListCatatan;
