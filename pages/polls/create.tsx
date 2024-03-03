import PollCreateForm from "@/ui-components/PollCreateForm";

const CreatePoll = () => {
  return (
    <PollCreateForm
      overrides={{
        owner: {
          disabled: true,
          isRequired: false,
          isReadOnly: true,
        },
      }}
    />
  );
};
export default CreatePoll;
