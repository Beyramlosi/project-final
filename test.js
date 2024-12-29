// Fonction pour montrer le loader
function showLoader() {
  document.querySelector('.loader-container').classList.remove('hidden');
}

// Fonction pour cacher le loader
function hideLoader() {
  document.querySelector('.loader-container').classList.add('hidden');
}

// Exemple d'utilisation
function simulateLoading() {
  showLoader();
  setTimeout(() => {
    hideLoader();
  }, 2000); // Cache le loader après 2 secondes
}

