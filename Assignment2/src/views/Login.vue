<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="register">
        <div>
          <h2>Register</h2>
          <input
            class="input"
            type="email"
            placeholder="Email address"
            v-model="register_form.email"
          />
          <div>
            <input
              @blur="v$.register_form.$touch()"
              class="input"
              type="password"
              placeholder="Password"
              v-model="register_form.password"
            />
            <div v-if="v$.register_form.$error">
              <div
                v-for="(error, index) of v$.register_form.$errors"
                :key="index"
              >
                <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
          </div>

          <input type="submit" value="Register" />
        </div>
      </form>

      <form class="login" @submit.prevent="login">
        <h2>Login</h2>
        <input
          class="input"
          type="email"
          placeholder="Email address"
          v-model="login_form.email"
        />

        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="login_form.password"
        />
        <input type="submit" value="Login" />
      </form>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      register_form: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
    };
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";

.forms {
  display: flex;
  min-height: 100vh;
  line-height: 600%;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}

form.register {
  color: #fff;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(
    to bottom right,
    rgb(162, 97, 219) 30%,
    rgb(172, 100, 230) 50%,
    rgb(40, 43, 237) 100%
  );
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.register input:not([type="submit"]) {
  color: black;
  border-bottom: 2px solid #fff;
}

form.login input:not([type="submit"]) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
  background-color: rgb(162, 97, 219);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

form.register input[type="submit"] {
  background-color: #fff;
  color: rgb(162, 97, 219);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(183, 2, 255);
}

.button {
  margin-left: 70%;
}
</style>
