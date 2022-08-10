
interface SocialMediaLinkProps {
    icon : any;
    url : string;
    className ?: string;
}

export function SocialMediaLink(props: SocialMediaLinkProps){
    return (
        <a 
        href={props.url} 
        target='_blank' 
        rel="noreferrer" 
        style={{
            'transition' : 'border-color 0.25s ease-in-out,background-color 0.25s ease-in-out,color 0.25s ease-in-out,box-shadow 0.25s ease-in-out'
        }}
        className={ props.className + ' hover:bg-white w-[2rem] h-[2rem] lg:w-[2rem] lg:h-[2rem]  md:h-[1.5rem] md:w-[1.5rem] flex items-center justify-center text-lg md:text-xs lg:text-base rounded-[.3125rem]'}>{props.icon}</a>
    );
}