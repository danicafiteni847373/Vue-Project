<template>
  <div class="teachers">
    <div class="title has-text-centred">Add new student</div>
    <div class="form">
      <transition-group name="list">
        <form>
          <div class="controls is-expanded">
            <label for="name" class="text">Name</label>
            <input
              @blur="v$.name.$touch()"
              class="input"
              v-model="name"
              type="text"
              placeholder="Add Name"
            />
            <div v-if="v$.name.$error">
              <div v-for="(error, index) of v$.name.$errors" :key="index">
                <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <div class="controls is-expanded">
            <label for="surname" class="text">Surname</label>
            <input
              @blur="v$.surname.$touch()"
              class="input"
              v-model="surname"
              type="text"
              placeholder="Add Surname"
            />
            <div v-if="v$.surname.$error">
              <div v-for="(error, index) of v$.surname.$errors" :key="index">
                <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <div class="controls is-expanded">
            <label for="number" class="text">Phone Number</label>
            <input
              @blur="v$.number.$touch()"
              class="input"
              v-model="number"
              type="text"
              placeholder="Add Phone Number"
            />
            <div class="errors" v-if="v$.number.$error">
              <div v-for="(error, index) of v$.number.$errors" :key="index">
                <div class="text-danger">
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="classs" class="text">Class</label>
            <input
              @blur="v$.classs.$touch()"
              class="input"
              v-model="classs"
              type="text"
              placeholder="Add Class Number"
            />
            <div v-if="v$.classs.$error">
              <div v-for="(error, index) of v$.classs.$errors" :key="index">
                <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <div>
            <label for="mark" class="text">Mark</label>
            <input
              @blur="v$.mark.$touch()"
              class="input"
              v-model="mark"
              type="text"
              placeholder="Add Class Number"
            />
            <div v-if="v$.mark.$error">
              <div v-for="(error, index) of v$.mark.$errors" :key="index">
                <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <div class="control">
            <button
              v-if="updateData !== true"
              :disabled="v$.$invalid"
              class="button is-link"
              @click="addToDo()"
            >
              Submit
            </button>

            <button
              v-else
              :disabled="v$.$invalid"
              class="button is-sucess"
              @click="updateStudents(id)"
            >
              Update
            </button>

            <div class="green">{{ addedMessage }}</div>
          </div>
        </form>
      </transition-group>
    </div>
  </div>
</template>

<script>
//@ is an alias to our src folder
import { db } from "@/firebase";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  alpha,
  numeric,
  minLength,
  maxLength,
} from "@vuelidate/validators";
//import { v4 as uuidv4 } from "uuid";

import "firebase/firestore";
import {
  // getFirestore,
  // getDocs,
  // querySnapshot,
  //onSnapshot,
  collection,
  doc,
  deleteDoc,
  //updateDoc,
  addDoc,
  updateDoc,
  //orderBy,
  //query,
  //limit,
} from "firebase/firestore";

//validation

export default {
  name: "Teachers",
  components: {},
  // setup() {
  //   toast("Welcome", {
  //     autoClose: 1000,
  //   });

  // },

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      name: "",
      surname: "",
      number: "",
      classs: "",
      mark: "",
      addedMessage: "",
      Pid: "",

      todos: [
        // {
        //   id: "id1",
        //   content: "Study",
        //   done: false,
        // },
        // {
        //   id: "id2",
        //   content: "Work",
        //   done: true,
        // },
      ],
    };
  },

  validations() {
    return {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(15),
        alpha,
      },
      surname: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(15),
        alpha,
      },
      number: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(8),
        numeric,
      },
      classs: {
        required,
        numeric,
      },
      mark: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(2),
        numeric,
      },
      //class: { required }, // Matches this.contact.email
    };
  },

  mounted() {
    //this will fire the first time the app is launched BUT also when
    //there is a change it will keep on listening and fire again
    // onSnapshot(
    //   query(collection(db, "todos"), orderBy("date", "desc"), limit(5)),
    //   (querySnapshot) => {
    //     const fbTodos = [];
    //     querySnapshot.forEach((doc) => {
    //       //console.log(doc.id, " => ", doc.data());
    //       const todo = {
    //         id: doc.id,
    //         name: doc.data().name,
    //         surname: doc.data().surname,
    //         number: doc.data().number,
    //         //classs: doc.data().classs,
    //       };
    //       fbTodos.push(todo);
    //     });
    //     this.todos = fbTodos;
    //   }
    // );
    // const todosCollectionQuery = query(
    //   collection(db, "todos"),
    //   orderBy("date", "desc"),
    //   limit(3)
    // );

    if (typeof this.$route.params.Pid !== "undefined") {
      this.id = this.$route.params.Pid; // Access the patient ID from the route parameters

      console.log("Received ID:", this.id);

      const Pid = this.$route.params.Pid;

      this.updateData = true;

      //if no id user will add a member. If there is an id user will update so we need to populate form with data

      if (Pid !== "") {
        console.log(Pid);
      }
    }
  },

  methods: {
    addToDo() {
      addDoc(collection(db, "todos"), {
        name: this.name,
        surname: this.surname,
        number: this.number,
        classs: this.classs,
        mark: this.mark,
      });

      this.name = "";
      this.surname = "";
      this.number = "";
      this.classs = "";
      this.mark = "";
      this.addedMessage = "Task added";
      setTimeout(() => {
        this.addedMessage = "";
      }, 2000);

      this.$router.push("/Students");
      console.log("next");
    },

    deleteToDo(id) {
      deleteDoc(doc(db, "todos", id));
      toast.warning("Deleting", {
        autoClose: 100,
      });
    },

    updateStudents(id) {
      console.log("teacher " + id);
      updateDoc(doc(db, "todos", id), {
        name: this.name,
        surname: this.surname,
        number: this.number,
        classs: this.classs,
        mark: this.mark,
      });
      this.$router.push("/Students");
    },
  },
};
</script>
<style>
@import "~bulma/css/bulma.css";

.form {
  max-width: 700px;
  height: 740px;
  padding: 10px;
  margin-top: -5%;
  background-color: white;
  border-top: 6px solid rgb(183, 2, 255);
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px 5px #888888;
}

.line-through {
  text-decoration: line-through;
}

.green {
  color: rgb(183, 2, 255);
}

/* list transitions*/

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.text {
  float: left;
  color: black;
}

.control {
  margin: 0;
  position: absolute;
  top: 90%;
  left: 45%;
}

.text-danger {
  color: red;
  border-style: solid;
  border-color: red;
}

@media (max-width: 700px) {
  /* CSS goes here */
  .control {
    margin-top: 70%;
    margin-left: -14%;
  }
  .form {
    width: 80%;
    height: 70%;
  }
}
</style>
