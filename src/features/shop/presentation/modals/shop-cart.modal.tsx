import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { BsCartX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

interface ShopCartModalProps{
  open : boolean,
  onClose: any,
}

export function ShopCartModal(props : ShopCartModalProps){

    if(props.open){
        document.body.classList.add('overflow-hidden');
    }else {
        document.body.classList.remove('overflow-hidden');
        return null;
    }

    
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-start overflow-auto'>
      <div className='bg-primary px-4 pt-[30px] pb-3 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px]'>

        <button className='absolute top-2 right-4 text-white text-2xl' onClick={()=>{
          document.body.classList.remove('overflow-hidden');
          props.onClose();
        }}><IoMdClose/></button>
        
        {/* Empty Cart */}
        <div className="justify-center items-center flex-col space-y-2 hidden">
            <BsCartX className="text-white text-7xl"/>
            <span className="text-white text-4xl font-['Bebas_Neue'] tracking-[2px]">Cart Empty</span>
        </div>

        <div>
            <h1 className="text-white text-3xl font-['Bebas_Neue'] tracking-[2px] text-center border-white border-2 rounded-t-2xl py-2 my-4">My Cart</h1>
            
            <div className="space-y-6">

              <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px] relative">
                  <img src={REACT_APP_UPLOADS_URL + "images/shop/products/100/test.jpg"} className="rounded-[10px] w-[92px] h-[92px]" alt="" />
                  <div className="flex-1 text-white px-3 py-2 flex flex-col">
                      <h3 className="text-sm">Family Pack Tofu Chips</h3>
                      <h3 className="text-xs">Quntity: <span className="text-tertiary">3</span></h3>
                      <h3 className="text-xs">Flavor: <span className="text-tertiary">Natural</span></h3>
                      <h3 className="text-base flex-1 flex justify-end items-end">₱ 295.00</h3>
                  </div>
                  <button className='absolute top-2 right-4 text-white' onClick={()=>{}}><IoMdClose/></button>
              </div>
            </div>

            <hr className="mt-6 mb-2 border-t-1" />

            <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white">Total:</span>
                  <span className="text-white">₱ 295.00</span>
                </div>

                <button className="bg-button text-white text-lg w-full py-2 rounded-lg">Process Orders</button>
            </div>

        </div>

      </div>
    </div>
  );

}