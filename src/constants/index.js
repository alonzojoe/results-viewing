import Swal from "sweetalert2";

export const ACTIONS = {
  SET_PATIENT: "set-patient",
  SET_RESULTS: "set-results",
  SET_VERIFIED: "set-verified",
  SET_PH: "set-ph",
};

export class Toast {
  message(icon, title, position = "top-end") {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon,
      title,
    });
  }
}
