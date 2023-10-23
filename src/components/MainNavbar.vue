<template>
  <nav class="navbar">
    <router-link to="/" >
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
    </router-link>
    <div class="menu">
      <ul class="nav-menu" :class="{ active: isMenuOpen }">
        <li class="nav-item nav-item-first">
          <router-link to="/" class="nav-link">Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/discover" class="nav-link">Discover</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/top-movies" class="nav-link">Top</router-link>
        </li>
      </ul>
    </div>
    <div class="hamburger" >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  mounted() {
    const hamburger = this.$el.querySelector(".hamburger");
    const navMenu = this.$el.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    const navLinks = this.$el.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  },
};
</script>

<style scoped>

.navbar {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 100px;
}

.logo {
  margin: 0 30px;
  width: 50px;
  height: 35px;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
}

li {
  list-style: none;
}

a {
  color: black;
  text-decoration: none;
  font-size: 20px;
  font-weight: 400;
  font-family: "Inter";
}

.hamburger {
  display: none;
  cursor: pointer;
  margin: 0 30px;
}

.bar {
  display: block;
  width: 50px;
  height: 3px;
  margin: 9px auto;
  background: linear-gradient(270deg, #90cea1 0%, #01b4e4 100%);
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(1) {
    transform: translateY(11px) rotate(45deg);
    transition: 0.5s;
  }

  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-11px) rotate(-45deg);
    transition: 0.5s;
  }

  .navbar {
    margin-right: 0;
  }

  .nav-menu {
    min-height: 100vh;
    position: fixed;
    left: -100%;
    top: 80px;
    gap: 0;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    text-align: center;
    transition: 0.5s;
  }

  .nav-item {
    margin-top: 30px;
  }

  .nav-item-first {
    margin-top: 50px;
  }

  .nav-link {
    font-size: 30px;
  }

  .nav-menu.active {
    left: 0;
    background: linear-gradient(270deg, #90cea1 0%, #01b4e4 100%);
  }

  a {
    color: white;
    font-size: 24px;
    text-transform: uppercase;
  }
}
</style>