"use client";

import { useEffect, useState } from "react";

type FieldType = "text" | "email" | "number" | "select" | "textarea";

type DynamicField = {
  id: number;
  label: string;
  type: FieldType;
  options?: string[];
};

type FormSchema = {
  id: number;
  formName: string;
  fields: DynamicField[];
};

export default function DynamicFormPage() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [savedForms, setSavedForms] = useState<FormSchema[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormSchema | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submissions, setSubmissions] = useState<any[]>([]);

  const [fieldConfig, setFieldConfig] = useState({
    label: "",
    type: "text" as FieldType,
    options: "",
  });

  const fetchForms = async () => {
    const res = await fetch("/api/forms");
    const data = await res.json();
    setSavedForms(data);
  };

  const fetchSubmissions = async () => {
    const res = await fetch("/api/submissions");
    const data = await res.json();
    setSubmissions(data);
  };

  useEffect(() => {
    fetchForms();
    fetchSubmissions();
  }, []);

  const addField = () => {
    if (!fieldConfig.label) return;

    const newField: DynamicField = {
      id: Date.now(),
      label: fieldConfig.label,
      type: fieldConfig.type,
      options:
        fieldConfig.type === "select"
          ? fieldConfig.options.split(",").map((o) => o.trim())
          : [],
    };

    setFields([...fields, newField]);
    setFieldConfig({ label: "", type: "text", options: "" });
  };

  const saveForm = async () => {
    await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formName, fields }),
    });

    setFormName("");
    setFields([]);
    fetchForms();
  };

  const handleChange = (label: string, value: string) => {
    setFormValues({ ...formValues, [label]: value });
  };

  const submitFormData = async () => {
    if (!selectedForm) return;

    await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId: selectedForm.id,
        formName: selectedForm.formName,
        values: formValues,
      }),
    });

    setFormValues({});
    fetchSubmissions();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dynamic Form Builder</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-xl">
          <input
            placeholder="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <input
            placeholder="Field Label"
            value={fieldConfig.label}
            onChange={(e) =>
              setFieldConfig({ ...fieldConfig, label: e.target.value })
            }
            className="w-full border p-2 rounded mb-3"
          />

          <select
            value={fieldConfig.type}
            onChange={(e) =>
              setFieldConfig({
                ...fieldConfig,
                type: e.target.value as FieldType,
              })
            }
            className="w-full border p-2 rounded mb-3"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="select">Dropdown</option>
            <option value="textarea">Textarea</option>
          </select>

          {fieldConfig.type === "select" && (
            <input
              placeholder="Options A,B,C"
              value={fieldConfig.options}
              onChange={(e) =>
                setFieldConfig({ ...fieldConfig, options: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />
          )}

          <button onClick={addField} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Field
          </button>

          <button onClick={saveForm} className="bg-blue-600 text-white px-4 py-2 rounded ml-3">
            Save Form
          </button>
        </div>

        <div className="border p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Saved Forms</h2>

          {savedForms.map((form) => (
            <button
              key={form.id}
              onClick={() => setSelectedForm(form)}
              className="block border p-3 rounded mb-2 w-full text-left"
            >
              {form.formName}
            </button>
          ))}
        </div>
      </div>

      {selectedForm && (
        <div className="mt-8 border p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">{selectedForm.formName}</h2>

          {selectedForm.fields.map((field) => (
            <div key={field.id} className="mb-3">
              <label>{field.label}</label>

              <input
                type={field.type}
                className="w-full border p-2 rounded"
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={submitFormData}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Submit Data
          </button>
        </div>
      )}

      <div className="mt-8 border p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Submitted Data</h2>

        {submissions.map((item) => (
          <div key={item.id} className="border p-3 rounded mb-3">
            <h3 className="font-bold">{item.formName}</h3>

            {Object.entries(item.values).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}