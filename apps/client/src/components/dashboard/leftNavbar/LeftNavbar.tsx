import { LeftNavbarStyled } from "./LeftNavbar.styled";
import { Navbar } from "@mantine/core";
import { MainLinks } from "./MainLinks";
import dullahanImage from "../../../../public/dullahan.png";

export default function LeftNavbar() {
  const { classes } = LeftNavbarStyled();

  return (
    <Navbar height={"100vh"} style={{ borderRight: "none", width: "60px" }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <img
              src={dullahanImage}
              alt={"logo of the company"}
              width={"30px"}
              height={"30px"}
            />
          </div>
          <MainLinks />
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
