import { AddIcon, AttachmentIcon, MinusIcon } from "@chakra-ui/icons";
import { Heading, HStack, IconButton, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Navbar = ({ visible, setVisible, filter, setFilter }) => {
  return (
    <HStack justifyContent="space-between">
      <Heading
        fontSize={{ base: "xl", sm: "xl" }}
        lineHeight={"90%"}
        bgGradient="linear(to-l, #cfd9df,#a6c0fe)"
        bgClip="text"
      >
        Catatan <br /> Extended
      </Heading>
      <HStack>
        <Input
          type="text"
          placeholder="Cari catatan"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
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
            colorScheme="green"
            aria-label="Delete database"
            icon={visible ? <MinusIcon /> : <AddIcon />}
            onClick={() => setVisible(!visible)}
            mr="4"
          />
        </motion.a>
      </HStack>
    </HStack>
  );
};

export default Navbar;
