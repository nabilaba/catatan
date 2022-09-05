import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FormCatatan = ({ visible, setVisible, setData, data }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const HandleSubmit = (e) => {
    const tgl = new Date();

    setData([
      {
        id: Date.now(),
        title: title,
        body: body,
        createdAt: tgl.toISOString(),
        archived: false,
      },
      ...data,
    ]);

    setTitle("");
    setBody("");
    setVisible(false);

    e.preventDefault();
  };

  return (
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
              <FormControl>
                <FormLabel>
                  Judul (Sisa Karakter: {50 - title.length})
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Judul catatan"
                  value={title}
                  maxLength="50"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Kalimat</FormLabel>
                <Textarea
                  placeholder="Masukkan catatan harian..."
                  name="input"
                  resize={"vertical"}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
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
  );
};

export default FormCatatan;
