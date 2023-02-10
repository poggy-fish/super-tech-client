import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./MyLinks";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-2 lg:px-4 text-le md:cursor-pointer group">
            <h1
              className="py-4 flex items-center justify-between md:pr-0 pr-5 text-md px-1 whitespace-nowrap"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              {heading === link.name ? (
                <span className="text-md md:mt-1 md:ml-2 inline">
                  <GoChevronUp />
                </span>
              ) : (
                <span className="text-md md:mt-1 md:ml-2 inline">
                  <GoChevronDown />
                </span>
              )}
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute top-36 hidden group-hover:md:block hover:md:block ">
                  <div className="py-3">
                    <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-3 gap-10 shadow-xl rounded-lg">
                    {link.subLinks?.map((mySubLink) => (
                      <div>
                        <h1 className="text-sm font-semibold md:pr-0 pr-5">
                          {mySubLink.Head}
                        </h1>
                        {mySubLink.subLink?.map((sLink) => (
                          <li className="text-sm text-gray-600 my-2.5">
                            <Link
                              to={sLink.link}
                              className="hover:text-blue-400"
                            >
                              {sLink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/*=========== Mobile menu ===========*/}

          <div
            className={`
          ${heading === link.name ? "md:hidden" : "hidden"}`}
          >
            {/* SubLinks */}

            {link?.subLinks.map((sLinks) => (
              <div>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== sLinks.Head
                        ? setSubHeading(sLinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex items-center justify-between text-md"
                  >
                    {sLinks.Head}
                    {subHeading === sLinks.Head ? (
                      <span className="text-sm md:mt-1 md:ml-2 inline">
                        <GoChevronUp />
                      </span>
                    ) : (
                      <span className="text-sm md:mt-1 md:ml-2 inline">
                        <GoChevronDown />
                      </span>
                    )}
                  </h1>
                  <div
                    className={`${
                      subHeading === sLinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {sLinks.subLink.map((sLink) => (
                      <li className="py-3 pl-14 text-sm">
                        <Link to={sLink.link} className="hover:text-blue-400">
                          {sLink.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-b border-gray-200 mr-4"></div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
