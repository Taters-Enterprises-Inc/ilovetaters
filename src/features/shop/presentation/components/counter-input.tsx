export function CounterInput(){

    return(
        <div className="h-10 w-32">

            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 border-2 border-white text-white">

                <button className=" h-full w-20 rounded-l cursor-pointer outline-none bg-primary">
                    <span className="m-auto text-2xl font-thin leading-3">−</span>
                </button>

                <input type="number" className="leading-2 bg-secondary outline-none text-center w-full font-semibold text-md  md:text-basecursor-default flex items-center" name="custom-input-number" value="0"/>
                
                <button className="h-full w-20 rounded-r cursor-pointer bg-primary">
                    <span className="m-auto text-2xl font-thin leading-3">+</span>
                </button>

            </div>

        </div>
    );
}