import React, { useState, useContext, useEffect } from "react";
import {
  MdKeyboardArrowDown as ArrowD,
  MdKeyboardArrowUp as ArrowU,
} from "react-icons/md";
import { ProductContext } from '../../../../Providers/ProductContext'
import { ProductDetailContext } from '../../ProductDetailContext'

const OptionsProduct = ({ colorIdSelected, setColorIdSelected, sizeIdSelected, setSizeIdSelected }) => {
  const { findColorById, findSizeById } = useContext(ProductContext)
  const { product, quantities, getQuantityByColorIdAndSizeId } = useContext(ProductDetailContext)
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])

  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    if (product) {
      const colorsTmp = []
      const sizesTmp = []

      product.detail.colors.forEach(colorId => {
        const color = findColorById(colorId)
        if (color) {
          colorsTmp.push(color)
        }
      })
      product.detail.sizes.forEach(sizeId => {
        const size = findSizeById(sizeId)
        if (size) {
          sizesTmp.push(size)
        }
      })

      setColors(colorsTmp)
      setSizes(sizesTmp)
    }
  }, [product, quantities])

  const toggleHandler = () => {
    setIsToggle(!isToggle);
  };

  const handleSelectColor = (colorId) => {
    if (colorIdSelected === colorId) {
      setColorIdSelected(undefined)
    } else {
      setColorIdSelected(colorId)
    }
  }

  const handleSelectSize = (sizeId) => {
    if (sizeIdSelected === sizeId) {
      setSizeIdSelected(undefined)
    } else {
      setSizeIdSelected(sizeId)
    }
  }

  return (
    <div className="flex p-2x border my-2x">
      <div className="flex-1">
        <h6>Màu sắc:</h6>
        <div className="flex flex-wrap w-[80%] ">
          {colors.map((item, index) => {
            let isDisabled = false
            if (sizeIdSelected) {
              if (getQuantityByColorIdAndSizeId(item.colorId, sizeIdSelected) === 0) {
                isDisabled = true
              }
            }
            if (product.totalQuantity === 0) {
              isDisabled = true
            }
            return <button
              key={index}
              disabled={isDisabled}
              // style={{ background: item }}
              className={`rounded-lg ml-2 mb-2 px-1 h-[30px] border border-Black75 w-auto ${isDisabled ? 'cursor-not-allowed' : 'hover:opacity-75'}  ${(colorIdSelected === item.colorId && !isDisabled) ? 'bg-Black75 text-white' : ''}`}
              onClick={() => handleSelectColor(item.colorId)}
            >{item.colorId}
            </button>
          })}
        </div>
        <h6>Size:</h6>
        <div className="flex flex-wrap w-[80%] gap-1 m-1x">
          {sizes.map((item, index) => {
            let isDisabled = false
            if (colorIdSelected) {
              if (getQuantityByColorIdAndSizeId(colorIdSelected, item.sizeId) === 0) {
                isDisabled = true
              }
            }
            if (product.totalQuantity === 0) {
              isDisabled = true
            }
            return <button key={index}
              disabled={isDisabled}
              className={`h-[40px] w-[40px] rounded-full border border-Black75 ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-Black10'}  ${(sizeIdSelected === item.sizeId && !isDisabled) ? 'bg-Black75 text-white' : 'text-Black75 '}`}
              onClick={() => handleSelectSize(item.sizeId)}>
              {item.name}
            </button>
          })}
        </div>
      </div>
      <div
        className={`relative flex-1 w-full min-h-[120px] ${isToggle && "min-h-[40px] h-[40px]"
          } rounded-md border border-Black75 m-1 overflow-y-hidden transition-all duration-150 ease-in-out`}
      >
        <div className="flex justify-center gap-4 items-center">
          <h6 className="m-2 font-bold">Mô tả sản phẩm</h6>
          {isToggle ? (
            <ArrowU size={30} onClick={toggleHandler} />
          ) : (
            <ArrowD size={30} onClick={toggleHandler} />
          )}{" "}
        </div>
        <div className="min-h-[230px] p-1x">{product ? product.description : ''}</div>
      </div>
    </div>
  );
};

export default OptionsProduct;
