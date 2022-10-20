import React from 'react';
import { FormControl } from '@mui/material';
import { BSCRatingRadioButton } from '../components/bsc-rating-radio-button';

export function BSCScoreCardPage() {
  return (
    <main className="lg:w-[60%] bg-white mx-auto h-auto font-['Varela_Round'] text-sm rounded my-6 md:w-[70%] w-[80%]">
        <div className="text-center text-secondary rounded-xl h-[20vh] bg-paper mb-3 
            border-t-[16px] border-solid border-secondary flex justify-evenly items-center flex-col">
            <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] md:text-4xl w-[85%]"> Balance Score Card </h1>
            <p className="text-xs lg:text-sm w-[90%] sm:w-[90%]">
                Please take a few minutes to complete this form. Rate 1 as the lowest and 5 as the highest. 
            </p>
        </div>

        <FormControl className="text-xs md:text-sm bg-paper rounded-xl block py-10 font-light" sx={{ py: 5}}>
            <div className="mx-[10%] py-5 leading-relaxed text-justify">
                <p> 1. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a type specimen book?    
                </p>
                <BSCRatingRadioButton />
            </div>
            
            <div className="mx-[10%] py-5 leading-relaxed text-justify">
                <p> 2. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a type specimen book?
                </p>
                <BSCRatingRadioButton />
            </div>
            
            <div className="mx-[10%] py-5 leading-relaxed text-justify">
                <p> 3. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a type specimen book?
                </p>
                <BSCRatingRadioButton />
            </div>
            
            <div className="mx-[10%] py-5 leading-relaxed text-justify">
                <p> 4. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a type specimen book?
                </p>
                <BSCRatingRadioButton />
            </div>
            
            <div className="mx-[10%] py-5 leading-relaxed text-justify">
                <p> 5. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                    took a galley of type and scrambled it to make a type specimen book?
                </p>
                <BSCRatingRadioButton />
            </div>
            
            <div className="mx-[10%] flex justify-between items-center mt-4">
                <button className="py-2 text-md text-white border rounded-lg bg-button w-[100px] invisible"  
                        type="submit" value="prev"> 
                        Prev 
                </button>
                <button className="py-2 text-md text-white border rounded-lg bg-button w-[100px]"  
                        type="submit" value="next"> 
                        Next 
                </button>
            </div>
        </FormControl>
    </main>
  );
}