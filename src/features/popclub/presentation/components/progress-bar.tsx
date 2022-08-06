
interface ProgressBarProps {
    percentage: number;
}

export function ProgressBar(props : ProgressBarProps){
    const percentage = props.percentage.toString();
    return (
        <div className='h-[13px] bg-white ease-in duration-300' style={{width: percentage + '%'}}>
        </div>
    );
}