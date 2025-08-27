  const festivals = [
      { name: "Dussera", date: "2025-10-01", video: "dussera.mp4" },
      { name: "Diwali", date: "2025-10-20", video: "diwali.mp4" },
      { name: "Christmas", date: "2025-12-25", video: "christmas.mp4" },
      { name: "New Year", date: "2026-01-01", video: "newyear.mp4" },
    ];

    const select = document.getElementById("festivalSelect");
    const countdownEl = document.getElementById("countdown");
    const festivalNameEl = document.getElementById("festivalName");
    const bgVideo = document.getElementById("bgVideo");

    // Populate dropdown
    festivals.forEach(f => {
      const option = document.createElement("option");
      option.value = f.name;
      option.textContent = f.name;
      select.appendChild(option);
    });

    let timer;

    select.addEventListener("change", () => {
      clearInterval(timer);

      const selectedFestival = festivals.find(f => f.name === select.value);

      if (!selectedFestival) {
        countdownEl.textContent = "Please select a festival";
        festivalNameEl.textContent = "";
        bgVideo.src = "homebg.mp4";
        bgVideo.play();
        return;
      }

      bgVideo.src = selectedFestival.video;
      bgVideo.play();

      festivalNameEl.textContent = selectedFestival.name;

      function updateCountdown() {
        const festivalDate = new Date(selectedFestival.date).getTime();
        const now = new Date().getTime();
        const distance = festivalDate - now;

        if (distance <= 0) {
          countdownEl.textContent = `🎉 Happy ${selectedFestival.name}! 🎉`;
          clearInterval(timer);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      updateCountdown();
      timer = setInterval(updateCountdown, 1000);
    });
