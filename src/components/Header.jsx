import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import defaultuser from "../assets/defaultuser.png";
import { BsSearch } from "react-icons/bs";
import { CgShoppingCart as Cart } from "react-icons/cg";
import { MdFavoriteBorder as Favorite } from "react-icons/md";
import { MdKeyboardArrowDown as ArrowD } from "react-icons/md";
import imgModel from "../assets/anh-mau.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuProfile from "./MenuProfile";
import NotificationCart from "./NotificationCart";
import HoverDropdown from "./HoverDropdown";
import { AppContext } from "../Providers/AppContext";
import useCarts from "../hooks/useCarts";
import config from "../config";
import { ProductContext } from "../Providers/ProductContext";

const Header = () => {
  const navigate = useNavigate()
  const { token, userLogin, carts } = useContext(AppContext);
  const { isChange, categories } = useContext(ProductContext)
  const [categoriesShow, setCategoriesShow] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShowPanel, setIsShowPanel] = useState(false);
  const [categoriesPanel, setCategoriesPanel] = useState([])
  const [isShowNoticationCart, setIsShowNoticationCart] = useState(false)
  const [hoverDropdown, setHoverDropdown] = useState(false);
  const [closeTabs, setCloseTabs] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  useCarts();

  useEffect(() => {
    if (categories.length > 0) {
      let categoriesShowTmp = []
      for (let category of categories) {
        if (category.parentId === null) {
          category.categories = []
          for (let categoryTmp of categories) {
            if (categoryTmp.parentId === category.categoryId) {
              category.categories.push(categoryTmp)
            }
          }
          categoriesShowTmp.push(category)
        }
      }
      categoriesShowTmp = categoriesShowTmp.map(item =>
        recursiveCategories(item, categories)
      )

      setCategoriesShow(categoriesShowTmp)
    }
  }, [isChange])

  useEffect(() => {
    const regex = /q=/gm
    if (!regex.test(document.location.search)) {
      setSearchValue('')
    }
  }, [document.location.search])

  const recursiveCategories = (category, categoriesRoot) => {
    category.categories = []
    for (let categoryTmp of categoriesRoot) {
      if (category.categoryId === categoryTmp.parentId) {
        category.categories.push(categoryTmp)
      }
    }

    category.categories = category.categories.map(item =>
      recursiveCategories(item, categoriesRoot)
    )

    return category
  }

  const handleSearch = () => {
    navigate(config.routes.product + "?q=" + searchValue)
  }

  const enterHandler = (categories) => {
    if (categories) {
      setCategoriesPanel(categories)
    }
    setIsShowPanel(true);
    setCloseTabs(false);
  };
  const CloseTabsHandler = () => {
    setCloseTabs(true);
    setIsShowPanel(false);
  };
  const leaveHandler = () => {
    setIsShowPanel(false);
  };
  const [isShowProfile, setIsShowProfile] = useState(true);
  const toggleShowProfile = () => {
    setIsShowProfile(!isShowProfile);
    setHoverDropdown(false);
  };

  useEffect(() => {
    if (token !== "" && userLogin) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token, userLogin]);

  return (
    <div className="sticky w-full transition top-0  bg-white shadow-sm z-40">
      <MenuProfile
        isShowProfile={isShowProfile}
        setIsShowProfile={() => setIsShowProfile(!isShowProfile)}
      />

      <div className="flex justify-between w-[1240px] mx-auto">
        <Link to={config.routes.home}>
          <img src={logo} alt="logo" className="h-[40px] m-2x" />
        </Link>
        <div className="search m-2x flex gap-2 items-center">
          <input
            type="text" value={searchValue}
            name="search" onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm sản phẩm ..."
            className="rounded-full pl-3x py-1x shadow-lg w-[430px] h-[40px]"
          />
          <button onClick={handleSearch}
            className="p-1x text-center rounded-full hover:shadow-md h-[45px] w-[45px] border border-Black10">
            <BsSearch size={30} />
          </button>
        </div>
        <div className="profile flex items-center justify-between m-2x cursor-pointer">
          <div
            className={`${!isAuthenticated && "hidden"
              } flex gap-4 items-center`}
          >
            <h6 className="font-bold">{userLogin ? userLogin.fullName : ""}</h6>
            <div className="relative !z-10">
              <img
                onClick={toggleShowProfile}
                onMouseEnter={() => setHoverDropdown(true)}
                src={defaultuser}
                // neu minh khong set relative cho img thi z-index khong hoat dong
                className="relative avt h-[40px] w-[40px] rounded-full hover:shadow-md z-20"
                alt="Avatar"
              />
              <HoverDropdown
                isVisible={hoverDropdown}
                setIsVisible={() => setHoverDropdown(false)}
              />
            </div>
          </div>
          <div className={`${isAuthenticated && "hidden"} flex `}>
            <Link
              to={config.routes.login}
              className="relative mx-1x py-2x px-3x text-center items-center border-2  border-DarkBlue flex"
            >
              <h6 className="text-DarkBlue">Đăng nhập</h6>
            </Link>
            <Link
              to={config.routes.register}
              className="relative mx-1x py-2x px-3x text-center items-center border-2  border-WarningColor flex"
            >
              <h6 className="text-WarningColor">Đăng ký</h6>
            </Link>
          </div>

          <div className="relative">
            <Link
              to={config.routes.cart}
              className="relative mx-1x py-2x px-3x text-center items-center border  border-solid border-BlackCool flex"
              onMouseEnter={() => {
                if (!document.baseURI.includes(config.routes.cart)) {
                  setIsShowNoticationCart(true)
                }
              }}
            >
              <h6 className="absolute right-[-6px] top-[-6px] text-white bg-ActiveColor rounded-full shadow-sm px-2">
                {carts.length}
              </h6>
              <h6 className="mx-2">Giỏ hàng</h6>
              {/*hien thong bao khi them san pham vao! */}
              <Cart color="green" size={30} />
            </Link>
            {isShowNoticationCart ?
              <div className="absolute left-0">
                <NotificationCart setIsVisible={() => setIsShowNoticationCart(false)} />
              </div>
              : ''}
          </div>
          <Link
            to={config.routes.favorite}
            className={`${!isAuthenticated && "hidden"
              } relative mx-1x py-2x px-3x text-center items-center border border-solid border-BlackCool flex`}
          >
            <h6 className="absolute right-[-6px] top-[-6px] text-white bg-ErrorColor rounded-full shadow-sm px-2">
              0
            </h6>
            <h6 className="mx-2">Yêu thích</h6>
            <Favorite color="red" size={30} />
          </Link>
        </div>
      </div>
      <div className="flex justify-between pb-2x w-[1240px] mx-auto">
        <div className="m-1x z-30">
          <nav className="flex gap-6 items-center h-[30px]">
            <NavLink
              to={config.routes.home}
              onMouseEnter={leaveHandler}
              className="flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <h6 className="font-semibold ml-4 mr-4">Trang chủ</h6>
            </NavLink>
            <NavLink
              to="/san-pham"
              onMouseEnter={leaveHandler}
              className="relative flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <h6 className="font-semibold mx-4">Tất cả</h6>
            </NavLink>
            {categoriesShow.map((category, index) => {
              return (
                <NavLink
                  key={index}
                  to={config.routes.product + "?c=" + category.categoryId}
                  onMouseEnter={() => enterHandler(category.categories)}
                  className="flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
                >
                  <h6 onClick={CloseTabsHandler} className="font-semibold ml-4">
                    {category.name}
                  </h6>
                  <ArrowD />
                </NavLink>
              )
            })}
            <NavLink
              to="/san-pham-khuyen-mai"
              onMouseEnter={leaveHandler}
              className="relative flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <p className="absolute bottom-[15px] right-[-21px] px-2 bg-ErrorColor text-white">
                Hot
              </p>
              <h6 className="font-semibold mx-4">Khuyến mãi</h6>
            </NavLink>
          </nav>
        </div>
        <div className="m-1x flex justify-between gap-2">
          <Link>
            <p className="font-semibold italic">Các chi nhánh trang web</p>
          </Link>
          <p className="font-semibold italic">Phone: 098555777</p>
          <p className="font-semibold italic">Đổi trả trong 15 ngày</p>
        </div>
      </div>
      {/* <div className={`${!isShowPanel&&"hidden"} flex absolute w-full left-0 h-[350px] bg-white justify-between z-20`}> */}
      <div
        onMouseEnter={() => enterHandler()}
        onMouseLeave={leaveHandler}
        className={`${!isShowPanel && "hidden"
          } flex absolute w-full left-0 h-[460px] bg-white justify-around p-2x  z-20`}
      >
        <div
          className={`${closeTabs && "hidden"
            } absolute w-full h-[60px] top-[-60px] left-0`}
        ></div>
        <div className="flex flex-col flex-wrap text-center">
          <div className="border-t border-Black5 min-w-[160px] min-h-[150px]">
            {(Array.isArray(categoriesPanel) && categoriesPanel.length > 0) ? categoriesPanel.map((category) =>
              <>
                <Link key={category.categoryId} to={config.routes.product + "?c=" + category.categoryId} >
                  <h6 className="font-bold">{category.name}</h6>
                </Link>
                {Array.isArray(category.categories) ? category.categories.map(categoryChild =>
                  <Link key={categoryChild.categoryId} to={config.routes.product + "?c=" + categoryChild.categoryId} >
                    <h6 className="font-normal">{categoryChild.name}</h6>
                  </Link>
                ) : ''}
                <br />
              </>
            ) : 'Danh mục này không có danh mục con!'}
          </div>
        </div>
        <div></div>
        <div className="">
          <img
            src={imgModel}
            alt="Ảnh mẫu"
            className="w-[280px] h-[430px] object-cover"
          />
        </div>
      </div>
      <div
        className={`${!isShowPanel && "hidden"
          } absolute left-0 bg-BlackCool opacity-50 h-[200vh] z-10 w-full`}
      ></div>
    </div>
  );
};

export default Header;
