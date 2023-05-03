interface IButton {
  text: string;
  fn?: Function;
  classes?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<IButton> = ({ text, fn, classes, icon, type }) => {
  return (
    <button
      type={type ?? 'button'}
      className={`flex justify-center items-center gap-1 bg-indigo-500 text-white px-4 py-2 border rounded-md hover:border-indigo-500 hover:text-gray-800 ${
        classes ?? ""
      }`}
      onClick={() => fn ? fn() : {}}
    >
      {text} {icon ?? ""}
    </button>
  );
};

export default Button;
