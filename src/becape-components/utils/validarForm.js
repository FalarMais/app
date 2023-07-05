import { toast } from "react-toastify";

export const validarForm = (e, func, classPlus) => {
  console.log(e, func);
  var forms = document.getElementsByClassName(
    classPlus ? classPlus : "needs-validation"
  );
  Array.prototype.filter.call(forms, function(form) {
    e.preventDefault();
    console.log(form, form.checkValidity());
    if (form.checkValidity() === false) {
      e.stopPropagation();
      console.log("erro");
      toast.warn("Verifique as pendências do formulário.");
      return form.classList.add("was-validated");
    } else {
      func();
    }

    form.classList.add("was-validated");
  });
};

export const revalidarForm = classPlus => {
  window
    .$(`.${classPlus ? classPlus : "needs-validation"}`)
    .removeClass("was-validated");
};
