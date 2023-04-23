import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import Blog from "./components/Blog";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const App = () => {
  // constructor();
  // {
  //   super();
  //   api.get("/").then((res) => {
  //     console.log(res.data);
  //   });
  // }

  const [content, setContent] = useState("n");

  const [notes, setNotes] = useState([
    // {
    //   id: nanoid(),
    //   text: "This is my first note!",
    //   date: "15/04/2021",
    //   color: "#9cdcfe",
    // },
    // {
    //   id: nanoid(),
    //   text: "This is my second note!",
    //   date: "21/04/2021",
    //   color: "#bee4f1",
    // },
    // {
    //   id: nanoid(),
    //   text: "This is my third note!",
    //   date: "28/04/2021",
    //   color: "pink",
    // },
  ]);

  useEffect(() => {
    api.get("/?format=json").then((res) => {
      setNotes(res.data);
    });
    api.get("other").then((res) => {
      console.log(res.data[0].darkMode);
      setDarkMode(res.data[0].darkMode);
    });
  }, []);
  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //     console.log("get" + notes.length);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  //   console.log("set" + notes.length);
  // }, [notes]);

  function generateRandomHSLColor() {
    var hue = Math.floor(Math.random() * 360);
    var saturation = Math.floor(Math.random() * 50) + 50;
    var lightness = Math.floor(Math.random() * 50) + 50;
    return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
  }
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      textContent: text,
      color: generateRandomHSLColor(),
      date: date.toLocaleDateString(),
    };
    api.post("/add", newNote).then((res) => {
      console.log(res);
      api.get("/?format=json").then((res) => {
        setNotes(res.data);
        console.log(res.data);
      });
    });

    // const newNotes = [...notes, newNote];
    // setNotes(newNotes);
  };

  const deleteNote = (id) => {
    //const newNotes = notes.filter((note) => note.id !== id);
    //setNotes(newNotes);
    api.delete("/del/" + id).then((res) => {
      console.log(res);
      api.get("/?format=json").then((res) => {
        setNotes(res.data);
        console.log(res.data);
      });
    });
  };

  const handleTitleClick = (c) => {
    if (content === "b") {
      setContent("n");
    } else {
      setContent("b");
    }
  };
  const handleToggleDarkMode = () => {
    const other = {
      darkMode: !darkMode,
    };
    api
      .put("pother", other)
      .then((res) => setDarkMode(!darkMode))
      .catch((e) => {
        console.log(e);
        setDarkMode(!darkMode);
      });
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header
          handleTitleClick={handleTitleClick}
          handleToggleDarkMode={handleToggleDarkMode}
          darkmode={darkMode}
          content={content}
        />
        {content === "n" && (
          <div>
            <Search handleSearchNote={setSearchText} darkmode={darkMode} />
            <NotesList
              notess={notes.filter((note) =>
                note.textContent
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )}
              //notess={notes}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
            />
          </div>
        )}
        {content === "b" && <Blog />}
      </div>
    </div>
  );
};

export default App;
