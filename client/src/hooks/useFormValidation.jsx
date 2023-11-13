export default function useFormValidation() {
  const validateAndHighlight = (input, isEmpty) => {
    if (isEmpty) {
      input.classList.add('error-highlight');
      return true;
    } else {
      input.classList.remove('error-highlight');
      return false;
    }
  };

  const isFormValid = ({ post }) => {
    const { title, content } = post;
    const titleInput = document.querySelector('[name="title"]');
    const contentInput = document.querySelector('[name="content"]');

    const titleError = validateAndHighlight(titleInput, !title);
    const contentError = validateAndHighlight(contentInput, !content);

    return !(titleError || contentError);
  };

  return [isFormValid];
}
