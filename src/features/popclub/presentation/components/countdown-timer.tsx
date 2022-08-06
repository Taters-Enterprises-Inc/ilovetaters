import moment from "moment";
import Countdown from "react-countdown";
import { ProgressBar } from "./progress-bar";
import {AiOutlineFieldTime} from 'react-icons/ai';



export function CountdownTimer(){
    var redeemDate : any = moment();
    var expirationDate : any = moment().add(5, 'seconds');

    const pad =(number : number) => ('0' + number).slice(-2);
    
    const renderer = ({ hours, minutes, seconds, completed, date} : any) => {

        if (!completed) {
            var today = moment();
            let timeName = '';
            const percentage = Math.round((1 - (today.diff(redeemDate)) / (expirationDate.diff(redeemDate))) * 100);
            
            if(hours > 0){
                if(hours === 1){
                    timeName = 'hour';
                }else{
                    timeName = 'hours';
                }
            } else if(minutes > 0){
                if(minutes === 1){
                    timeName = 'minute';
                }else{
                    timeName = 'minutes';
                }
            } else if(seconds > 0){
                if(seconds === 1){
                    timeName = 'second';
                }else{
                    timeName = 'seconds';
                }
            }

            return(
                <>
                    <ProgressBar percentage={percentage}/>
                    <div className="text-white flex items-center text-xl px-4 ">
                        <AiOutlineFieldTime className="text-4xl mr-2"/>
                        <div className="font-['Bebas_Neue'] tracking-[4px]">
                            <span className="mr-2">
                                {pad(hours)}:{pad(minutes)}:{pad(seconds)} 
                            </span>
                            <span className="text-sm">{timeName} Remaining</span>
                        </div>
                    </div>
                </>
            );
        }
    };
  
    return (
        <>
            <Countdown renderer={renderer} date={expirationDate}/>
        </>
    );
}