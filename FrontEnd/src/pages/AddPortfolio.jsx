// import { useState } from "react";
// import axios from "axios";

// export default function CreatePage() {
//   const [form, setForm] = useState({
//     metaTitle: "",
//     metaDescription: "",
//     permalink: "",

//     featuredImage: "",

//     title: "",
//     description: "",

//     sections: [],
//   });

//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [
//         ...form.sections,
//         {
//           image: "",
//           title: "",
//           description: "",
//         },
//       ],
//     });
//   };

// const uploadImage = async (file) => {
//   const formData = new FormData();

//   formData.append("image", file);

//   const res = await axios.post(
//     "http://localhost:5000/api/upload/image",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data.url;
// };
//   const updateSection = (
//     index,
//     field,
//     value
//   ) => {
//     const updated = [...form.sections];

//     updated[index][field] = value;

//     setForm({
//       ...form,
//       sections: updated,
//     });
//   };

//   const savePage = async () => {
//     await axios.post(
//       "http://localhost:5000/api/portfolio",
//       form
//     );

//     alert("Page Saved");
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Create Page</h2>

//       <input
//         placeholder="Meta Title"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             metaTitle: e.target.value,
//           })
//         }
//       />

//       <br />
//       <br />

//       <textarea
//         placeholder="Meta Description"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             metaDescription: e.target.value,
//           })
//         }
//       />

//       <br />
//       <br />

//       <input
//         placeholder="Permalink"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             permalink: e.target.value,
//           })
//         }
//       />

//       <br />
//       <br />

//      <input
//   type="file"
//   accept="image/*"
//   onChange={async (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const imageUrl =
//       await uploadImage(file);

//     setForm({
//       ...form,
//       featuredImage: imageUrl,
//     });
//   }}
// />

// {form.featuredImage && (
//   <img
//     src={form.featuredImage}
//     alt="preview"
//     width={200}
//   />
// )}

//       <br />
//       <br />

//       <input
//         placeholder="Page Title"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             title: e.target.value,
//           })
//         }
//       />

//       <br />
//       <br />

//       <textarea
//         placeholder="Main Description"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             description: e.target.value,
//           })
//         }
//       />

//       <br />
//       <br />

//       <button onClick={addSection}>
//         Add Section
//       </button>

//       <hr />

//       {form.sections.map(
//         (section, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ddd",
//               padding: 20,
//               marginTop: 20,
//             }}
//           >
//            <input
//   type="file"
//   accept="image/*"
//   onChange={async (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const imageUrl = await uploadImage(file);

//     updateSection(
//       index,
//       "image",
//       imageUrl
//     );
//   }}
// />

// {section.image && (
//   <img
//     src={section.image}
//     alt=""
//     width="200"
//   />
// )}

//             <br />
//             <br />

//             <input
//               placeholder="Title"
//               onChange={(e) =>
//                 updateSection(
//                   index,
//                   "title",
//                   e.target.value
//                 )
//               }
//             />

//             <br />
//             <br />

//             <textarea
//               placeholder="Description"
//               onChange={(e) =>
//                 updateSection(
//                   index,
//                   "description",
//                   e.target.value
//                 )
//               }
//             />
//           </div>
//         )
//       )}

//       <br />

//       <button onClick={savePage}>
//         Save Page
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";

export default function CreatePage() {
  const [form, setForm] = useState({
    metaTitle: "",
    metaDescription: "",
    permalink: "",
    featuredImage: "",
    title: "",
    description: "",
    sections: [],
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log("Uploading Image:", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.url;
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          image: "",
          title: "",
          description: "",
        },
      ],
    }));
  };

  const updateSection = (index, field, value) => {
    const updated = [...form.sections];
    updated[index][field] = value;

    setForm((prev) => ({
      ...prev,
      sections: updated,
    }));
  };

  const savePage = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/portfolio",
        form
      );

      alert("Page Saved Successfully");
    } catch (error) {
      console.error(error);
      console.log(form);
      alert("Failed to Save Page");
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Create New Page
          </h1>
          <p className="text-slate-500 mt-2">
            Manage SEO, content, and sections.
          </p>
        </div>

        {/* SEO Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            SEO Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border rounded-lg p-3"
              placeholder="Meta Title"
              value={form.metaTitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  metaTitle: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Permalink"
              value={form.permalink}
              onChange={(e) =>
                setForm({
                  ...form,
                  permalink: e.target.value,
                })
              }
            />
          </div>

          <textarea
            className="border rounded-lg p-3 w-full mt-4 min-h-[120px]"
            placeholder="Meta Description"
            value={form.metaDescription}
            onChange={(e) =>
              setForm({
                ...form,
                metaDescription: e.target.value,
              })
            }
          />
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Featured Image
          </h2>

          <input
            type="file"
            accept="image/*"
            className="block w-full border rounded-lg p-3"
            onChange={async (e) => {
              const file = e.target.files[0];

              if (!file) return;

              const imageUrl =
                await uploadImage(file);

              setForm({
                ...form,
                featuredImage: imageUrl,
              });
            }}
          />

          {form.featuredImage && (
            <img
              src={form.featuredImage}
              alt="Preview"
              className="mt-4 rounded-xl w-full max-w-md border"
            />
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Main Content
          </h2>

          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="Page Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            className="border rounded-lg p-3 w-full min-h-[200px]"
            placeholder="Main Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Sections */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">
              Page Sections
            </h2>

            <button
              onClick={addSection}
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Add Section
            </button>
          </div>

          {form.sections.map((section, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 mb-6 bg-slate-50"
            >
              <h3 className="font-semibold mb-4">
                Section {index + 1}
              </h3>

              <input
                type="file"
                accept="image/*"
                className="block w-full border rounded-lg p-3"
                onChange={async (e) => {
                  const file =
                    e.target.files[0];

                  if (!file) return;

                  const imageUrl =
                    await uploadImage(file);

                  updateSection(
                    index,
                    "image",
                    imageUrl
                  );
                }}
              />

              {section.image && (
                <img
                  src={section.image}
                  alt=""
                  className="mt-4 rounded-xl max-w-sm border"
                />
              )}

              <input
                className="border rounded-lg p-3 w-full mt-4"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) =>
                  updateSection(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />

              <textarea
                className="border rounded-lg p-3 w-full mt-4 min-h-[150px]"
                placeholder="Section Description"
                value={section.description}
                onChange={(e) =>
                  updateSection(
                    index,
                    "description",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>

        {/* Save */}
        <div className="mt-8">
          <button
            onClick={savePage}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium"
          >
            Save Page
          </button>
        </div>
      </div>
    </div>
  );
}