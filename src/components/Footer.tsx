import { Flex, Text } from "@radix-ui/themes";
import { BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse mt-auto justify-center items-center gap-3 border-t-2 bg-gray-100 w-full py-5 md:flex-row md:gap-6">
      <Text weight="bold" size="2">
        &copy; 2024 Issue Tracker. All rights reserved.
      </Text>
      <Text size="2" weight="bold">
        Version 1.0
      </Text>
      <Flex align="center" gap="2">
        <Text size="2" weight="bold">
          Contact Us:
        </Text>
        <a target="_blank" href="mailto: karim.uug007@gmail.com">
          <SiGmail />
        </a>
        <a target="_blank" href="https://linkedin.com/in/karimsamiribrahim">
          <BsLinkedin />
        </a>
        <a target="_blank" href="https://github.com/KabyDaKabenz">
          <FaGithub />
        </a>
      </Flex>
    </footer>
  );
};

export default Footer;
