interface Props {
  content: string;
  onDelete: () => void;
}

const DeleteAlertContent = ({ content, onDelete }: Props) => {
  return (
    <div className="p-5">
      <p className="text-md">{content}</p>
      <div className="flex items-center justify-end mt-6">
        <button type="button" className="btn-small" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
