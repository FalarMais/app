import { toast } from "react-toastify";

export const validarForm = (e, func) => {
  var forms = document.getElementsByClassName("needs-validation");
  Array.prototype.filter.call(forms, function(form) {
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      console.log("erro");
      toast.warn("Verifique as pendências do formulário.");
    } else {
      func();
    }

    form.classList.add("was-validated");
  });
};

export const revalidarForm = () => {
  window.$(".needs-validation").removeClass("was-validated");
};
