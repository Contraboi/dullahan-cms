import { Tooltip, UnstyledButton } from "@mantine/core";
import { LeftNavbarStyled } from "./LeftNavbar.styled";
import { Link, useLocation } from "react-router-dom";
import { mainLinksData } from "../../../../App";

export const MainLinks = () => {
  const { classes, cx } = LeftNavbarStyled();
  const location = useLocation();

  return (
    <>
      {Object.keys(mainLinksData).map((key) => (
        <Tooltip
          label={mainLinksData[key].label}
          position="right"
          withArrow
          transitionDuration={100}
          key={mainLinksData[key].label}
        >
          <Link to={mainLinksData[key].path}>
            <UnstyledButton
              className={cx(classes.mainLink, {
                [classes.mainLinkActive]: location.pathname.includes(
                  mainLinksData[key].path,
                ),
              })}
            >
              {mainLinksData[key].icon({ size: 24 })}
            </UnstyledButton>
          </Link>
        </Tooltip>
      ))}
    </>
  );
};
