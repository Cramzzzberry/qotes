<template>
  <div class="navbar">
    <div> <!-- logo -->
      <router-link to="/dashboard" class="main-brand">Achord</router-link>
    </div>
    <input type="text" placeholder="Search here..." class="search-box"> <!-- search bar -->
    <div class="profile-wrapper"> <!-- profile-cluster -->
      <a href="#" class="profile-cluster">
        <span>Jan Roe Bantuan</span>
        <div class="profile-picture"></div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;

  position: sticky;
  top: 0;

  width: 100%;
  height: 61px;
  padding: 0.5rem 10rem;

  background-color: var(--gray-50);
  border-bottom: 1px solid var(--gray-100);

  & > div > .main-brand {
    color: var(--green-400);
    font-size: 1.5rem;
    font-weight: 600;

    opacity: 1;
    transition: color 100ms ease-in-out;

    &:hover {
      color: var(--green-300);
    }
  }

  & > .search-box {
    --padding-x: 1rem;
    padding: 0.75rem var(--padding-x);

    background-color: var(--gray-100);
    border: none;
    border-radius: 4px;
    outline: none;

    color: var(--gray-700);
    font-size: 1rem;
  }

  & > .profile-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    & > .profile-cluster {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;

      & > .profile-picture {
        flex-shrink: 0;

        width: 2rem;
        height: 2rem;
        
        background-color: var(--green-400);
        border-radius: 100%;
      }
    }
  }
}
</style>