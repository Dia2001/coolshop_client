import React, { useState } from "react";
import logo from "../assets/logo.png";
import defaultuser from "../assets/defaultuser.png";
import { BsSearch } from "react-icons/bs";
import { CgShoppingCart as Cart } from "react-icons/cg";
import { MdFavoriteBorder as Favorite } from "react-icons/md";
import {
  MdKeyboardArrowDown as ArrowD,
  MdKeyboardArrowUp as ArrowU,
} from "react-icons/md";
import imgModel from "../assets/anh-mau.jpg";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const [isShowPanel, setIsShowPanel] = useState(false);
  const enterHandler = () => {
    setIsShowPanel(true);
  };
  const leaveHandler = () => {
    setIsShowPanel(false);
  };
  return (
    <div className="relative w-full">
      <div className="flex justify-between w-[1240px] mx-auto">
        <NavLink to="/">
        <img src={logo} alt="logo" className="h-[40px] m-2x" />
        </NavLink>
        <div className="search m-2x flex gap-2 items-center">
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm sản phẩm ..."
            className="rounded-full pl-3x py-1x shadow-lg w-[430px] h-[40px]"
          />
          <button className="p-1x text-center rounded-full hover:shadow-md h-[45px] w-[45px] border border-Black10">
            <BsSearch size={30} />
          </button>
        </div>
        <div className="profile flex items-center justify-between m-2x cursor-pointer">
          <div className="flex gap-4 items-center">
            <h6 className="font-bold">Nhân</h6>
            <img
              src={defaultuser}
              className="h-[40px] w-[40px] rounded-full hover:shadow-md"
              alt="Avatar"
            />
          </div>
          <NavLink to="thanh-toan" className="mx-1x py-2x px-3x text-center items-center border  border-solid border-BlackCool flex">
            <h6 className="mx-2">Giỏ hàng</h6>
            <Cart color="green" size={30} />
          </NavLink>
          <NavLink to="/gio-hang"className="mx-1x py-2x px-3x text-center items-center border border-solid border-BlackCool flex">
            <h6 className="mx-2">Yêu thích</h6>
            <Favorite color="red" size={30} />
          </NavLink>
        </div>
      </div>
      <div className="flex justify-between pb-2x w-[1240px] mx-auto">
        <div className="m-1x">
          <nav className="flex gap-6 items-center">
            <NavLink
              to="/"
              onMouseEnter={leaveHandler}
              className="flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <h6 className="font-semibold ml-4 mr-4">Trang chủ</h6>
            </NavLink>
            <NavLink
              to="/san-pham"
              onMouseEnter={enterHandler}
             
              className="flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <h6 className="font-semibold ml-4">Nam</h6>
              <ArrowD />
            </NavLink>
            <NavLink
              to="/san-pham"
              onMouseEnter={enterHandler}
             
              className="flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <h6 className="font-semibold ml-4">Nữ</h6>
              <ArrowD />
            </NavLink>
            <NavLink
              to="/san-pham"
              onMouseEnter={enterHandler}
            
              className="flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <h6 className="font-semibold ml-4">Quý ông</h6>
              <ArrowD />
            </NavLink>
            <NavLink
              to="/san-pham-khuyen-mai"
              onMouseEnter={leaveHandler}
              className="relative flex gap-1 border-b border-BlackCool hover:border-DarkBlue hover:border-b-2"
            >
              <p className="absolute bottom-[15px] right-[-21px] px-2 bg-ErrorColor text-white">Hot</p>
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
        onMouseEnter={enterHandler}
        onMouseLeave={leaveHandler}
        className={`${!isShowPanel&&"hidden"} flex absolute w-full left-0 h-[460px] bg-white justify-around p-2x  z-20`}
      >
        <div className="flex flex-col flex-wrap text-center">
          <div className="border-t border-Black5 min-w-[160px] min-h-[150px]">
            <h6 className="font-bold">Áo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <br/>
          </div>
          <div className="border-t border-Black5 min-w-[160px] min-h-[150px]">
          <h6 className="font-bold">Đồ thể thao</h6>
          <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <br/>
          </div>
          <div className="border-t border-Black5 min-w-[160px] min-h-[150px]">
          <h6 className="font-bold">Áo</h6>
          <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <h6>AoDaiBo</h6>
            <br/>
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
        className={`${
          !isShowPanel && "hidden"
        } absolute left-0 bg-BlackCool opacity-50 h-[200vh] z-10 w-full`}
      ></div>
    </div>
  );
};

export default Header;