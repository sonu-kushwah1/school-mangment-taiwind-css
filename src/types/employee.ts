export type ComputedSalary = {
  salary_increment_amount: string;
  total_salary: string;
  pf_increment_amount: string;
  insurance_increment_amount: string;
};

export type Employee = {
  id: string;
  fname: string;
  lname: string;
  salary: string;
  gender: "male" | "female" | "other";
  phone: string;
  des: string;
  pf: string;
};
