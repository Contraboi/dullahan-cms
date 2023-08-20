import * as React from "react";
import { LeftNavbarStyled } from "./LeftNavbar.styled";
import { Link, useLocation } from "react-router-dom";

type DynamicLinksProps = {
  path?: "templates" | "collections" | "components" | "assets";
  dynamicLinks?: Array<{ title: string; handle: string }>;
};

export const DynamicLinks = ({ dynamicLinks, path }: DynamicLinksProps) => {
  const location = useLocation();
  const { classes, cx } = LeftNavbarStyled();
  if (!dynamicLinks) return null;

  return (
    <div>
      {dynamicLinks.map((link) => (
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: location.pathname.includes(
              `/${path}/${link.handle}`
            ),
          })}
          to={`/${path}/${link.handle}`}
          key={link.handle}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};
