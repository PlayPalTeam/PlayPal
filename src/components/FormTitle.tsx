interface FormTitleProps {
  title: string;
}

const FormTitle = ({ title }: FormTitleProps) => {
  return (
    <h1 className="text-4xl text-center mb-4">{title}</h1>
  );
};

export default FormTitle;
