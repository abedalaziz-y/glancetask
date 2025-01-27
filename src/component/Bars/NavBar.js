import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Badge } from "antd";
import "./nav.css";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { getWishlist } from "../../functions/user";
import {
  AppstoreOutlined,
  HolderOutlined,
  HistoryOutlined,
  StarOutlined,
  SafetyOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
  MoreOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ControlOutlined,
  ShoppingCartOutlined,
  ContactsOutlined,
  CameraFilled,
  FileMarkdownFilled,
} from "@ant-design/icons";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./search/form";
import Side from "./Side";
import { Content } from "antd/lib/layout/layout";

const logoPic = new URL("user.png", import.meta.url);

const NavBar = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const { width, height } = windowDimensions;

  let { user, cart, wishlist, sidebar } = useSelector((state) => ({
    ...state,
  }));
  const [country_code, setCountry_code] = useState("Jo");
  const [city, setCity] = useState("city");
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    let interval;
    setTimeout(() => {
      fetchCountry(); 

      interval = setInterval(() => {
        fetchCountry(); 
      }, 3600000);
    }, 0);
  }, []);

  const [top, setTop] = useState(0);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  let dispatch = useDispatch();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGE_OUT",
      payload: null,
    });
    dispatch({
      type: "WISHLIST",
      payload: [],
    });
    localStorage.removeItem("wishlist");

    navigate("/login");
  };
  const handleClick = (event) => {
    setCurrent(event.key);
  };
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const { Item } = Menu;
  const handleUSerClick = () => {
    if (typeof window !== "undefined") {
      dispatch({
        type: "SET_SIDE",
        payload: true,
      });
    }
  };
  return (
    <div>
      {width > 500 && (
        <Menu
          className="pc"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="home" icon={<AppstoreOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="Movie" icon={<HolderOutlined />}>
            <Link to="/movie">Movies</Link>
          </Menu.Item>

          {!user && width > 450 && (
            <Menu.Item key="login" icon={<UserOutlined />} className="ms-auto">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}

          {user &&
            user.role === "subscriber" &&
            width > 450 &&
            user.picture.length > 0 && (
              <>
                <Menu.SubMenu
                  className="  navbar-brand ms-auto "
                  icon={
                    <Avatar
                      className="ml-2"
                      src={user.picture[0].url || logoPic}
                      shape="circle"
                      size={{
                        xs: 30,
                        sm: 40,
                        md: 40,
                        lg: 50,
                        xl: 50,
                        xxl: 140,
                      }}
                      icon={<UserOutlined />}
                    />
                  }
                  eventkey="UserName"
                  title={
                    user.name ||
                    (user.email &&
                      user.email.split(
                        "@"
                      )[0]) 
                  }
                >
                  {user && user.role === "subscriber" && (
                    <Menu.Item
                      icon={
                        <HistoryOutlined
                          style={{ fontSize: "16px", color: "green" }}
                        />
                      }
                      ceventkey="setting:1"
                    >
                      <Link to="/user/history"> History</Link>
                    </Menu.Item>
                  )}
                  {user && user.role === "subscriber" && (
                    <Menu.Item
                      ceventkey="setting:1"
                      icon={
                        <UserOutlined
                          style={{ fontSize: "15px", color: "blue" }}
                        />
                      }
                    >
                      <Link to="/user/profile"> Profile</Link>
                    </Menu.Item>
                  )}
                  {user && (
                    <Menu.Item
                      className={
                        wishlist.length > 0 ? "text-success" : "text-mutted"
                      }
                      key="wishlist"
                      icon={<StarOutlined />}
                    >
                      <Link to="/user/wishlist">
                        <Badge
                          className={
                            wishlist.length > 0 ? "text-success" : "text-mutted"
                          }
                          count={wishlist.length}
                          offset={[9, 0]}
                        >
                          wishlist
                        </Badge>
                      </Link>
                    </Menu.Item>
                  )}
                  {user && user.role === "subscriber" && (
                    <Menu.Item
                      ceventkey="setting:1"
                      icon={
                        <SafetyOutlined
                          style={{ fontSize: "15px", color: "purple" }}
                        />
                      }
                    >
                      <Link to="/user/password"> Password</Link>
                    </Menu.Item>
                  )}
                  {user && user.role === "admin" && (
                    <Menu.Item eventkey="setting:1">
                      <Link className="nav-link  " to="/admin/dashboard">
                        Dashboard
                      </Link>
                    </Menu.Item>
                  )}

                  <Menu.Item
                    icon={
                      <LogoutOutlined
                        style={{ fontSize: "16px", color: "red" }}
                      />
                    }
                    onClick={logout}
                  >
                    log out
                  </Menu.Item>
                </Menu.SubMenu>{" "}
              </>
            )}
          {user && user.role === "subscriber" && width > 450 && (
            <>
              <Menu.SubMenu
                className="  navbar-brand ms-auto "
                icon={
                  <Avatar
                    className="ml-2"
                    src={user.img || logoPic}
                    shape="circle"
                    size={{
                      xs: 20,
                      sm: 20,
                      md: 20,
                      lg: 20,
                      xl: 20,
                      xxl: 20,
                    }}
                    icon={<UserOutlined />}
                  />
                }
                eventkey="UserName"
                title={
                  user.name ||
                  (user.email &&
                    user.email.split(
                      "@"
                    )[0]) 
                }
              >
             
                {user && (
                  <Menu.Item
                    className={
                      wishlist.length > 0 ? "text-success" : "text-mutted"
                    }
                    key="wishlist"
                    icon={<StarOutlined />}
                  >
                    <Link to="/user/wishlist">
                      <Badge
                        className={
                          wishlist.length > 0 ? "text-success" : "text-mutted"
                        }
                        count={wishlist.length}
                        offset={[9, 0]}
                      >
                        wishlist
                      </Badge>
                    </Link>
                  </Menu.Item>
                )}
             
                {user && user.role === "admin" && (
                  <Menu.Item eventkey="setting:1">
                    <Link className="nav-link  " to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </Menu.Item>
                )}

                <Menu.Item
                  icon={
                    <LogoutOutlined
                      style={{ fontSize: "16px", color: "red" }}
                    />
                  }
                  onClick={logout}
                >
                  log out
                </Menu.Item>
              </Menu.SubMenu>{" "}
            </>
          )}

          {user &&
            user.role === "admin" &&
            width > 450 &&
            user.picture.length === 0 && (
              <Menu.SubMenu
                className="  navbar-brand ms-auto "
                icon={
                  <Avatar
                    className="ml-2"
                    src={user.img || logoPic}
                    shape="circle"
                    size={{
                      xs: 20,
                      sm: 20,
                      md: 20,
                      lg: 20,
                      xl: 20,
                      xxl: 20,
                    }}
                    icon={<UserOutlined />}
                  />
                }
                eventkey="UserName"
                title={
                  user.name ||
                  (user.email &&
                    user.email.split(
                      "@"
                    )[0]) 
                }
              >
                
                {user && user.role === "subscriber" && (
                  <Menu.Item ceventkey="setting:1">
                    <Link className="nav-link " to="/user/history">
                      {" "}
                      History
                    </Link>
                  </Menu.Item>
                )}
                {user && user.role === "admin" && (
                  <Menu.Item
                    eventkey="setting:2"
                    icon={
                      <DashboardOutlined
                        style={{ fontSize: "15px", color: "blue" }}
                      />
                    }
                  >
                    <Link to="/admin/dashboard">DashBoard</Link>
                  </Menu.Item>
                )}

                {user && user.role === "admin" && (
                  <Menu.Item
                    icon={
                      <HistoryOutlined
                        style={{ fontSize: "16px", color: "green" }}
                      />
                    }
                    ceventkey="setting:1"
                  >
                    <Link to="/user/history"> History</Link>
                  </Menu.Item>
                )}

                {user && (
                  <Menu.Item
                    className={
                      wishlist.length > 0 ? "text-success" : "text-mutted"
                    }
                    key="wishlist"
                    icon={<StarOutlined />}
                  >
                    <Link to="/user/wishlist">
                      <Badge
                        className={
                          wishlist.length > 0 ? "text-success" : "text-mutted"
                        }
                        count={wishlist.length}
                        offset={[9, 0]}
                      >
                        wishlist
                      </Badge>
                    </Link>
                  </Menu.Item>
                )}

                <Menu.Item
                  icon={
                    <LogoutOutlined
                      style={{ fontSize: "16px", color: "red" }}
                    />
                  }
                  onClick={logout}
                >
                  log out
                </Menu.Item>
              </Menu.SubMenu>
            )}
          {user &&
            user.role === "admin" &&
            width > 450 &&
            user.picture.length > 0 && (
              <Menu.SubMenu
                className="  navbar-brand ms-auto "
                icon={
                  <Avatar
                    className="ml-2"
                    src={
                      (user.picture && user.picture[0].url) ||
                      (user.img && user.img) ||
                      (!user.img && logoPic)
                    }
                    shape="circle"
                    size={{
                      xs: 30,
                      sm: 40,
                      md: 40,
                      lg: 50,
                      xl: 50,
                      xxl: 140,
                    }}
                    icon={<UserOutlined />}
                  />
                }
                eventkey="UserName"
                title={
                  user.name ||
                  (user.email &&
                    user.email.split(
                      "@"
                    )[0]) 
                }
              >
              
              
                {user && user.role === "admin" && (
                  <Menu.Item
                    eventkey="setting:2"
                    icon={
                      <DashboardOutlined
                        style={{ fontSize: "15px", color: "blue" }}
                      />
                    }
                  >
                    <Link to="/admin/dashboard">DashBoard</Link>
                  </Menu.Item>
                )}
             
               
               
                {user && (
                  <Menu.Item
                    className={
                      wishlist.length > 0 ? "text-success" : "text-mutted"
                    }
                    key="wishlist"
                    icon={<StarOutlined />}
                  >
                    <Link to="/user/wishlist">
                      <Badge
                        className={
                          wishlist.length > 0 ? "text-success" : "text-mutted"
                        }
                        count={wishlist.length}
                        offset={[9, 0]}
                      >
                        wishlist
                      </Badge>
                    </Link>
                  </Menu.Item>
                )}
                {user && user.role === "admin" && (
                  <Menu.Item
                    ceventkey="setting:1"
                    icon={
                      <SafetyOutlined
                        style={{ fontSize: "15px", color: "purple" }}
                      />
                    }
                  >
                    <Link to="/user/password"> Password</Link>
                  </Menu.Item>
                )}

                <Menu.Item
                  icon={
                    <LogoutOutlined
                      style={{ fontSize: "16px", color: "red" }}
                    />
                  }
                  onClick={logout}
                >
                  log out
                </Menu.Item>
              </Menu.SubMenu>
            )}
        </Menu>
      )}
      {width < 500 && (
        <Menu
          className="pc"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <button className="btn btn-outline">
            <Menu.Item key="home" icon={<AppstoreOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
          </button>

          <Menu.Item key="Movie" icon={<ShoppingOutlined />}>
            <Link to="/movie">Movies</Link>
          </Menu.Item>
        


          <a></a>
        </Menu>
      )}

      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
       

      
       
      </Menu>

    </div>
  );
};

export default NavBar;
