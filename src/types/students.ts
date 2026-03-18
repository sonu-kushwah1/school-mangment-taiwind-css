export type ComputedSalary = {
  salary_increment_amount: string;
  total_salary: string;
  pf_increment_amount: string;
  insurance_increment_amount: string;
};

export type Student = {
  id: string;
  fname: string;
  lname: string;
  gender: "male" | "female" | "other";
  phone: string;
  dob: string;
  bloodGroup: string;
  religion: string;
  email: string;
  class: string;
  section: string;
   fees: string;
};
