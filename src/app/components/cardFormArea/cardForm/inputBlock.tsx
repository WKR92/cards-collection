interface IInputBlock {
  title: string;
  text: string;
  icon: React.ReactNode;
  input: React.ReactNode;
  side: "left" | "right";
}

const InputBlock: React.FC<IInputBlock> = ({
  title,
  text,
  icon,
  input,
  side,
}) => {
  return (
    <div className={`mx-auto text-gray-400 max-w-[800px] flex items-center border-b pb-10 mb-10 border-gray-800 ${side === 'left' ? '' : 'flex-row-reverse'}`}>
      <div className={`sm:w-32 sm:h-32 h-20 w-20 inline-flex items-center justify-center rounded-full text-yellow-400 bg-gray-800 flex-shrink-0 ${side === 'left' ? 'mr-10' : 'ml-10'}`}>
        {icon}
      </div>
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-white text-lg title-font font-medium mb-2">
          {title}
        </h2>
        <p className="leading-relaxed text-base mb-4">
          {text}
        </p>
        {input}
      </div>
    </div>
  );
};
    
export default InputBlock;
