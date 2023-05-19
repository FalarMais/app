import { toast } from "react-toastify";

export const validarForm = func => {
  var forms = document.getElementsByClassName("needs-validation");
  Array.prototype.filter.call(forms, function(form) {
    form.addEventListener(
      "submit",
      function(event) {
        event.preventDefault();

        if (form.checkValidity() === false) {
          event.stopPropagation();
          toast.warn("Verifique as pendências do formulário.");
        } else {
          func();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
};
