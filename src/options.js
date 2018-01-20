function saveOptions(e) {
  browser.storage.sync.set({threshold: document.querySelector("#threshold").value});
  e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.managed.get('threshold');
  storageItem.then((res) => {
    document.querySelector("#managed-threshold").innerText = res.threshold;
  });

  var gettingItem = browser.storage.sync.get('threshold');
  gettingItem.then((res) => {
    document.querySelector("#threshold").value = res.threshold || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
