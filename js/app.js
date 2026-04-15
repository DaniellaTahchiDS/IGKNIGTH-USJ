      // Check for dark mode preference - disabled on mobile
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        window.innerWidth >= 768
      ) {
        document.documentElement.classList.add("dark");
      }

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          if (event.matches && window.innerWidth >= 768) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        });

      // Global state object
      const appState = {
        userBalance: 0,
        userName: "Maria Nassar",
        cart: [],
        transactions: [],
        investments: [],
        wasteTypes: {
          plastic: [
            { id: "water_bottle", name: "Water Bottle", value: 15 },
            { id: "soda_can", name: "Soda Bottle", value: 20 },
            { id: "juice_bottle", name: "Juice Bottle", value: 25 },
            { id: "shopping_bag", name: "Plastic Bag", value: 5 },
          ],
          paper: [
            { id: "newspaper", name: "Newspaper", value: 10 },
            { id: "notebook", name: "Notebook", value: 15 },
            { id: "cardboard", name: "Cardboard Box", value: 20 },
            { id: "magazine", name: "Magazine", value: 10 },
          ],
          metal: [
            { id: "soda_can_metal", name: "Aluminum Can", value: 25 },
            { id: "food_can", name: "Food Can", value: 20 },
            { id: "bottle_cap", name: "Bottle Caps (10 pcs)", value: 15 },
            { id: "metal_scrap", name: "Metal Scrap (100g)", value: 30 },
          ],
          glass: [
            { id: "glass_bottle", name: "Glass Bottle", value: 30 },
            { id: "jar", name: "Glass Jar", value: 25 },
            { id: "broken_glass", name: "Broken Glass (100g)", value: 15 },
            { id: "mirror", name: "Mirror Pieces", value: 20 },
          ],
        },
        activeWasteType: "plastic",
        projectData: {
          magis: { current: 3540, total: 5000, supporters: 24 },
          aumonerie: { current: 2120, total: 3000, supporters: 18 },
          "07jour": { current: 1800, total: 4000, supporters: 15 },
          fssocial: { current: 2650, total: 3500, supporters: 21 },
        },
        storeItems: [
          {
            id: "hoodie",
            name: "USJ Hoodie",
            price: 250,
            category: "clothing",
            description:
              "Premium quality USJ hoodie with embroidered logo. Available in multiple sizes.",
            popular: true,
          },
          {
            id: "notebook",
            name: "Eco-Friendly Notebook",
            price: 120,
            category: "stationery",
            description:
              "100% recycled paper notebook with USJ logo. 120 pages, lined paper.",
          },
          {
            id: "waterbottle",
            name: "Eco Water Bottle",
            price: 180,
            category: "accessories",
            description:
              "Reusable water bottle made from recycled materials. 750ml capacity.",
          },
          {
            id: "totebag",
            name: "Canvas Tote Bag",
            price: 90,
            category: "accessories",
            description:
              "Organic cotton tote bag with USJ sustainability logo. Perfect for shopping.",
          },
          {
            id: "penset",
            name: "Eco Pen Set",
            price: 60,
            category: "stationery",
            description:
              "Set of 3 pens made from recycled plastic. Blue, black, and green ink.",
          },
          {
            id: "cap",
            name: "USJ Cap",
            price: 150,
            category: "clothing",
            description:
              "Adjustable cotton cap with embroidered USJ logo. One size fits all.",
          },
        ],
        leaderboard: [
          { name: "Ahmad K.", points: 2450, position: 1 },
          { name: "Sarah M.", points: 1870, position: 2 },
          { name: "Rami L.", points: 1530, position: 3 },
          { name: "You", points: 1250, position: 4, isUser: true },
        ],
        achievements: [
          {
            id: "first_recycle",
            name: "First Recycle",
            icon: "bx-recycle",
            color: "amber",
          },
          {
            id: "ten_sessions",
            name: "10 Sessions",
            icon: "bx-trophy",
            color: "green",
          },
          {
            id: "first_invest",
            name: "First Invest",
            icon: "bx-donate-heart",
            color: "blue",
          },
        ],
        appointments: [],
        arduino: {
          connected: false,
          binOpen: false,
          lastCommand: null,
          status: "disconnected",
        },
      };

      document.addEventListener("DOMContentLoaded", function () {
        // Force light mode on mobile
        if (window.innerWidth < 768) {
          document.documentElement.classList.remove("dark");
        }

        // Login handling
        const loginForm = document.getElementById("loginForm");
        const mainApp = document.getElementById("mainApp");

        loginForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const studentId = document.getElementById("studentId").value;
          const password = document.getElementById("password").value;

          // Simple validation
          if (studentId && password) {
            document.getElementById("login").classList.add("hidden");
            mainApp.classList.remove("hidden");

            // Initialize app after login
            initializeApp();
          }
        });

        // Logout functionality
        document
          .getElementById("logoutMobile")
          .addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("login").classList.remove("hidden");
            mainApp.classList.add("hidden");
          });

        document
          .getElementById("logoutDesktop")
          .addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("login").classList.remove("hidden");
            mainApp.classList.add("hidden");
          });

        function initializeApp() {
          // Set initial app state
          updateAppState();

          // Mobile menu toggle
          const mobileMenuBtn = document.getElementById("mobileMenuBtn");
          const mobileMenu = document.getElementById("mobileMenu");

          mobileMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
          });

          // Section navigation
          const navLinks = document.querySelectorAll(".nav-link");
          const sections = document.querySelectorAll("section");

          navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
              e.preventDefault();

              const targetSectionId = this.getAttribute("data-section");

              // Hide mobile menu after clicking a link
              mobileMenu.classList.add("hidden");

              // Hide all sections
              sections.forEach((section) => {
                section.classList.add("hidden");
                section.classList.remove("active");
              });

              // Show target section
              const targetSection = document.getElementById(targetSectionId);
              targetSection.classList.remove("hidden");

              // Scroll to top of the section
              window.scrollTo(0, 0);

              // Add transition effect
              setTimeout(() => {
                targetSection.classList.add("active");
              }, 50);
            });
          });

          // Initialize all sections
          initHomeSection();
          initScanner();
          initStore();
          initInvest();
          initTransactions();
          initAppointments();
          initAccount();
          initHelp();

          // Initialize charts
          initCharts();
        }

        // Home section initialization
        function initHomeSection() {
          const userDisplayName = document.getElementById("userDisplayName");
          const wasteRecycled = document.getElementById("wasteRecycled");
          const monthlyEarningsHome = document.getElementById(
            "monthlyEarningsHome"
          );
          const lifetimeActivities =
            document.getElementById("lifetimeActivities");
          const recentTransactions =
            document.getElementById("recentTransactions");
          const leaderboard = document.getElementById("leaderboard");

          // Set user name
          userDisplayName.textContent = appState.userName.split(" ")[0];

          // Set stats - for demo we'll start with some placeholder values
          wasteRecycled.textContent = "15.2 kg";
          monthlyEarningsHome.textContent = "520";
          lifetimeActivities.textContent = "57";

          // Add transactions to recent transactions section
          if (appState.transactions.length === 0) {
            // Add sample transactions if none exist yet
            addSampleTransactions();
          }

          updateRecentTransactions();

          // Populate leaderboard
          leaderboard.innerHTML = "";
          appState.leaderboard.forEach((entry) => {
            const itemClass = entry.isUser
              ? "bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg"
              : "";
            const badgeColor =
              entry.position === 1
                ? "bg-yellow-400"
                : entry.position === 2
                ? "bg-gray-300 dark:bg-gray-600"
                : entry.position === 3
                ? "bg-amber-600"
                : "bg-primary-500";

            const leaderboardItem = document.createElement("div");
            leaderboardItem.className = `flex items-center ${itemClass}`;
            leaderboardItem.innerHTML = `
              <div class="h-8 w-8 rounded-full ${badgeColor} flex items-center justify-center text-white font-bold mr-3">
                ${entry.position}
              </div>
              <div class="flex-1">
                <div class="flex justify-between">
                  <span class="font-medium">${entry.name}</span>
                  <span class="font-semibold">${entry.points}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div class="${badgeColor} h-2 rounded-full" style="width: ${Math.round(
              (entry.points / 2450) * 100
            )}%"></div>
                </div>
              </div>
            `;
            leaderboard.appendChild(leaderboardItem);
          });
        }

        // Add sample transactions for demo
        function addSampleTransactions() {
          const now = new Date();
          const formattedToday = `Apr ${now.getDate()}, 2025`;
          const yesterdayDate = new Date(now);
          yesterdayDate.setDate(now.getDate() - 1);
          const formattedYesterday = `Apr ${yesterdayDate.getDate()}, 2025`;

          appState.transactions = [
            {
              id: 1,
              date: formattedToday,
              description: "Plastic Bottle",
              category: "Recycling",
              amount: 15,
              type: "earning",
              status: "Completed",
              time: "10:24 AM",
            },
            {
              id: 2,
              date: formattedYesterday,
              description: "USJ Hoodie Purchase",
              category: "Store",
              amount: -250,
              type: "spending",
              status: "Completed",
              time: "3:45 PM",
            },
            {
              id: 3,
              date: formattedYesterday,
              description: "Paper Recycling",
              category: "Recycling",
              amount: 35,
              type: "earning",
              status: "Completed",
              time: "1:12 PM",
            },
            {
              id: 4,
              date: formattedYesterday,
              description: "Magis Club Investment",
              category: "Investment",
              amount: -300,
              type: "investment",
              status: "Completed",
              time: "11:30 AM",
            },
            {
              id: 5,
              date: `Apr ${yesterdayDate.getDate() - 2}, 2025`,
              description: "Bulk Recycling",
              category: "Recycling",
              amount: 120,
              type: "earning",
              status: "Completed",
              time: "2:15 PM",
            },
          ];

          // Update user balance based on transactions
          appState.userBalance = appState.transactions.reduce(
            (balance, transaction) => balance + transaction.amount,
            1250 // Starting balance
          );
        }

        // Update recent transactions display
        function updateRecentTransactions() {
          const recentTransactions =
            document.getElementById("recentTransactions");
          recentTransactions.innerHTML = "";

          // Show only the 3 most recent transactions
          const recentTransactionsList = appState.transactions.slice(0, 3);

          recentTransactionsList.forEach((transaction) => {
            const isPositive = transaction.amount > 0;
            const transactionElement = document.createElement("div");
            transactionElement.className = "flex items-center justify-between";
            transactionElement.innerHTML = `
              <div class="flex items-center">
                <div class="p-2 mr-3 ${
                  isPositive
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                } rounded-lg">
                  <i class="bx ${
                    isPositive
                      ? "bx-plus text-green-600 dark:text-green-400"
                      : "bx-minus text-red-600 dark:text-red-400"
                  }"></i>
                </div>
                <div>
                  <p class="font-medium">${transaction.description}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${
                    transaction.date
                  }, ${transaction.time}</p>
                </div>
              </div>
              <span class="${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              } font-medium">${isPositive ? "+" : ""}${
              transaction.amount
            }</span>
            `;
            recentTransactions.appendChild(transactionElement);
          });
        }

        // Arduino communication functions
        function initializeArduinoConnection() {
          const binConnectionIndicator = document.getElementById(
            "binConnectionIndicator"
          );
          const binConnectionStatus = document.getElementById(
            "binConnectionStatus"
          );
          const reconnectBinBtn = document.getElementById("reconnectBinBtn");

          // Set initial UI state
          updateArduinoConnectionUI();

          // Reconnect button
          reconnectBinBtn.addEventListener("click", function () {
            connectToArduino();
          });

          // Attempt initial connection
          connectToArduino();
        }

        async function connectToArduino() {
          try {
            // Request a port
            const port = await navigator.serial.requestPort();

            // Open the port with the same baud rate as Arduino
            await port.open({ baudRate: 9600 });

            // Create reader and writer
            const reader = port.readable.getReader();
            const writer = port.writable.getWriter();

            // Store in app state
            appState.arduino.port = port;
            appState.arduino.reader = reader;
            appState.arduino.writer = writer;
            appState.arduino.connected = true;

            // Update UI
            updateArduinoConnectionUI();

            // Start listening for messages from Arduino
            startArduinoListener();

            return true;
          } catch (error) {
            console.error("Error connecting to Arduino:", error);
            return false;
          }
        }
        async function startArduinoListener() {
          if (!appState.arduino.connected || !appState.arduino.reader) return;

          const decoder = new TextDecoder();
          let buffer = "";

          try {
            while (appState.arduino.connected) {
              const { value, done } = await appState.arduino.reader.read();

              if (done) {
                // Reader has been canceled
                break;
              }

              // Add received data to buffer
              buffer += decoder.decode(value, { stream: true });

              // Process complete lines
              const lines = buffer.split("\n");
              buffer = lines.pop(); // Keep the incomplete line in the buffer

              for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                  handleArduinoMessage(trimmedLine);
                }
              }
            }
          } catch (error) {
            console.error("Error reading from Arduino:", error);
          } finally {
            // Clean up
            if (appState.arduino.reader) {
              appState.arduino.reader.releaseLock();
            }
            appState.arduino.connected = false;
            updateArduinoConnectionUI();
          }
        }
        // Function to handle messages from Arduino
        function handleArduinoMessage(message) {
          console.log("Arduino says:", message);

          if (message.startsWith("BIN_OPENED")) {
            appState.arduino.binOpen = true;
            // Update UI to show bin is open
          } else if (message.startsWith("BIN_CLOSED")) {
            appState.arduino.binOpen = false;
            // Update UI to show bin is closed

            // If item was detected, continue with reward process
            if (message.includes("ITEM_DETECTED")) {
              continueRewardProcess();
            }
          } else if (message.startsWith("PROCESSING_COMPLETE")) {
            // Processing is complete, update UI
            const binStatusMessage =
              document.getElementById("binStatusMessage");
            const binStatusDetails =
              document.getElementById("binStatusDetails");
            if (binStatusMessage && binStatusDetails) {
              binStatusMessage.textContent = "Processing complete!";
              binStatusDetails.textContent = "Awarding SCUDO to your wallet...";
            }
          }
        }
        function updateArduinoConnectionUI() {
          const binConnectionIndicator = document.getElementById(
            "binConnectionIndicator"
          );
          const binConnectionStatus = document.getElementById(
            "binConnectionStatus"
          );

          if (appState.arduino.connected) {
            binConnectionIndicator.className =
              "w-3 h-3 rounded-full bg-green-500 mr-2";
            binConnectionStatus.textContent = "Connected";
          } else {
            binConnectionIndicator.className =
              "w-3 h-3 rounded-full bg-red-500 mr-2";
            binConnectionStatus.textContent = "Disconnected";
          }
        }

        // Function to send commands to Arduino
        async function sendArduinoCommand(command) {
          if (!appState.arduino.connected || !appState.arduino.writer) {
            showSuccessModal(
              "Error",
              "Arduino is not connected. Please reconnect."
            );
            return false;
          }

          try {
            // Encode the command as a byte array
            const encoder = new TextEncoder();
            const data = encoder.encode(command + "\n");

            // Send the command
            await appState.arduino.writer.write(data);
            appState.arduino.lastCommand = command;
            console.log("Sent to Arduino:", command);

            return true;
          } catch (error) {
            console.error("Error sending command to Arduino:", error);
            appState.arduino.connected = false;
            updateArduinoConnectionUI();
            return false;
          }
        }

        // Scanner section initialization
        function initScanner() {
          const startScannerBtn = document.getElementById("startScannerBtn");
          const scannerCover = document.getElementById("scannerCover");
          const reader = document.getElementById("reader");
          const scanResult = document.getElementById("scanResult");
          const binLocation = document.getElementById("binLocation");
          const binDetails = document.getElementById("binDetails");
          const unlockBinBtn = document.getElementById("unlockBinBtn");
          const binUnlockedAlert = document.getElementById("binUnlockedAlert");
          const progressBar = document.getElementById("progressBar");
          const binStatusMessage = document.getElementById("binStatusMessage");
          const binStatusDetails = document.getElementById("binStatusDetails");
          const progressStatus = document.getElementById("progressStatus");
          const wasteTypeOptions =
            document.querySelectorAll(".waste-type-option");
          const itemSelect = document.getElementById("itemSelect");
          const estimatedReward = document.getElementById("estimatedReward");
          const decreaseQuantityBtn =
            document.getElementById("decreaseQuantity");
          const increaseQuantityBtn =
            document.getElementById("increaseQuantity");
          const quantityInput = document.getElementById("quantityInput");
          const binNumberInput = document.getElementById("binNumberInput");
          const submitBinNumber = document.getElementById("submitBinNumber");

          // Initialize Arduino connection
          initializeArduinoConnection();

          // Initialize item select with plastic items by default
          updateItemOptions("plastic");

          // Make waste type options clickable
          wasteTypeOptions.forEach((option) => {
            option.addEventListener("click", function () {
              // Remove active class from all options
              wasteTypeOptions.forEach((opt) => opt.classList.remove("active"));

              // Add active class to clicked option
              this.classList.add("active");

              // Get the waste type
              const wasteType = this.getAttribute("data-type");

              // Update app state
              appState.activeWasteType = wasteType;

              // Update the item select options
              updateItemOptions(wasteType);
            });
          });

          // Update the item options based on waste type
          function updateItemOptions(wasteType) {
            // Clear existing options except the placeholder
            itemSelect.innerHTML =
              '<option value="">-- Select item type --</option>';

            // Add new options based on waste type
            appState.wasteTypes[wasteType].forEach((item) => {
              const option = document.createElement("option");
              option.value = item.id;
              option.textContent = `${item.name} (${item.value} SCUDO)`;
              option.dataset.value = item.value;
              itemSelect.appendChild(option);
            });

            // Update estimated reward
            updateEstimatedReward();
          }

          // Update estimated reward based on selected item and quantity
          function updateEstimatedReward() {
            const quantity = parseInt(quantityInput.value) || 1;
            const selectedOption = itemSelect.options[itemSelect.selectedIndex];

            let reward = 0;
            if (selectedOption && selectedOption.dataset.value) {
              reward = parseInt(selectedOption.dataset.value) * quantity;
            }

            estimatedReward.textContent = `${reward} SCUDO`;
          }

          // Item select change event
          itemSelect.addEventListener("change", updateEstimatedReward);

          // Quantity input events
          quantityInput.addEventListener("input", updateEstimatedReward);

          decreaseQuantityBtn.addEventListener("click", function () {
            let qty = parseInt(quantityInput.value);
            if (qty > 1) {
              quantityInput.value = qty - 1;
              updateEstimatedReward();
            }
          });

          increaseQuantityBtn.addEventListener("click", function () {
            let qty = parseInt(quantityInput.value);
            if (qty < 10) {
              quantityInput.value = qty + 1;
              updateEstimatedReward();
            }
          });

          // QR Scanner button
          if (startScannerBtn) {
            startScannerBtn.addEventListener("click", function () {
              reader.classList.remove("hidden");
              scannerCover.classList.add("hidden");

              try {
                // Use HTML5QRCode to actually access the camera
                if (window.Html5Qrcode) {
                  const html5QrCode = new Html5Qrcode("reader");
                  const qrConfig = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                  };

                  html5QrCode
                    .start(
                      { facingMode: "environment" }, // Use the back camera
                      qrConfig,
                      (decodedText) => {
                        // On successful scan
                        html5QrCode.stop();

                        // Process the QR code content
                        handleSuccessfulScan(decodedText);
                      },
                      (errorMessage) => {
                        // Handle scan errors
                        console.log(errorMessage);
                      }
                    )
                    .catch((err) => {
                      // If camera access is denied or other startup error
                      console.error("QR Code scanner failed to start:", err);

                      // Fallback to simulated scan for demo
                      setTimeout(() => {
                        handleSuccessfulScan("BIN-CST-001");
                      }, 2000);
                    });
                } else {
                  // Fallback if library isn't loaded
                  setTimeout(() => {
                    handleSuccessfulScan("BIN-CST-001");
                  }, 2000);
                }
              } catch (error) {
                console.error("QR scanner error:", error);
                // Fallback to simulated scan
                setTimeout(() => {
                  handleSuccessfulScan("BIN-CST-001");
                }, 2000);
              }
            });
          }

          // Handle successful QR scan or bin number entry
          function handleSuccessfulScan(binCode) {
            // Set bin info based on the code scanned
            let location, details;

            if (binCode.includes("CST")) {
              location = "CST Bin Recognized";
              details = "USJ SCUDOnce Building, 2nd Floor";
            } else if (binCode.includes("CSS")) {
              location = "CSS Bin Recognized";
              details = "USJ Huvelin Campus, Main Hall";
            } else {
              location = "Bin Recognized";
              details = "USJ Campus, ID: " + binCode;
            }

            binLocation.textContent = location;
            binDetails.textContent = details;
            scanResult.classList.remove("hidden");
          }

          // Bin number input submission
          submitBinNumber.addEventListener("click", function () {
            if (binNumberInput.value.trim()) {
              handleSuccessfulScan(binNumberInput.value.trim());
            }
          });

          // Bin unlocking functionality
          if (unlockBinBtn) {
            unlockBinBtn.addEventListener("click", function () {
              // Check if connected to Arduino
              if (!appState.arduino.connected) {
                // Try to reconnect
                connectToArduino();
                showSuccessModal(
                  "Connection Error",
                  "Attempting to connect to the bin. Please try again in a few seconds."
                );
                return;
              }

              // Send command to open bin lid
              const success = sendArduinoCommand("OPEN_BIN");

              if (!success) {
                showSuccessModal(
                  "Error",
                  "Failed to communicate with the bin. Please try again."
                );
                return;
              }

              // Show bin unlocked alert
              binUnlockedAlert.classList.remove("hidden");
              binStatusMessage.textContent = "Bin unlocked!";
              binStatusDetails.textContent =
                "Please dispose of your item and close the lid.";

              // Start listening for bin status updates (lid closed signal)
              setTimeout(() => {
                // Simulate bin being closed by user

                sendArduinoCommand("CLOSE_BIN");
                binStatusMessage.textContent = "Bin closed!";
                binStatusDetails.textContent = "Processing your recyclables...";
                progressStatus.textContent = "Processing...";
                continueRewardProcess();
                // Proceed with the reward process
              }, 5000);
            });
          }

          // Continue reward process after bin is closed
          function continueRewardProcess() {
            binUnlockedAlert.classList.remove("hidden");
            // Get reward amount
            const rewardText = estimatedReward.textContent;
            const reward = parseInt(rewardText.split(" ")[0]);

            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
              progress += 20;
              progressBar.style.width = `${progress}%`;

              if (progress >= 100) {
                clearInterval(interval);

                // Simulate completion and IGKNIGHT added
                setTimeout(() => {
                  // Update balance
                  appState.userBalance += reward;
                  updateBalanceDisplays();

                  // Add transaction to history
                  const selectedOption =
                    itemSelect.options[itemSelect.selectedIndex];
                  const itemName = selectedOption
                    ? selectedOption.text.split(" (")[0]
                    : "Recycling";

                  const now = new Date();
                  const formattedDate = `Apr ${now.getDate()}, 2025`;
                  const formattedTime = `${now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}`;

                  const newTransaction = {
                    id: appState.transactions.length + 1,
                    date: formattedDate,
                    description: itemName,
                    category: "Recycling",
                    amount: reward,
                    type: "earning",
                    status: "Completed",
                    time: formattedTime,
                  };

                  appState.transactions.unshift(newTransaction);
                  updateTransactionDisplays();

                  // Show success message
                  showSuccessModal(
                    "Recycling Complete!",
                    `+${reward} SCUDO have been added to your wallet!`
                  );

                  // Reset UI
                  binUnlockedAlert.classList.add("hidden");
                  progressBar.style.width = "0%";
                  scanResult.classList.add("hidden");
                  reader.classList.add("hidden");
                  scannerCover.classList.remove("hidden");
                }, 1000);
              }
            }, 800);
          }
        }

        // Store section initialization
        function initStore() {
          const storeFilters = document.querySelectorAll(".store-filter");
          const storeItemsContainer = document.getElementById("storeItems");
          const clearCartBtn = document.getElementById("clearCartBtn");
          const checkoutBtn = document.getElementById("checkoutBtn");
          const emptyCart = document.getElementById("emptyCart");
          const filledCart = document.getElementById("filledCart");
          const cartItems = document.getElementById("cartItems");
          const cartTotal = document.getElementById("cartTotal");

          // Populate store items
          populateStoreItems();

          // Filter functionality
          storeFilters.forEach((filter) => {
            filter.addEventListener("click", function () {
              // Remove active class from all filters
              storeFilters.forEach((f) => {
                f.classList.remove("bg-primary-600", "text-white");
                f.classList.add(
                  "bg-gray-200",
                  "dark:bg-gray-700",
                  "text-gray-700",
                  "dark:text-gray-300"
                );
              });

              // Add active class to clicked filter
              this.classList.remove(
                "bg-gray-200",
                "dark:bg-gray-700",
                "text-gray-700",
                "dark:text-gray-300"
              );
              this.classList.add("bg-primary-600", "text-white");

              const filterValue = this.getAttribute("data-filter");

              // Show/hide items based on filter
              const storeItems = document.querySelectorAll(".store-item");
              storeItems.forEach((item) => {
                const itemCategory = item.getAttribute("data-category");

                if (filterValue === "all" || filterValue === itemCategory) {
                  item.classList.remove("hidden");
                } else {
                  item.classList.add("hidden");
                }
              });
            });
          });

          // Populate store items
          function populateStoreItems() {
            storeItemsContainer.innerHTML = "";

            appState.storeItems.forEach((item) => {
              const storeItem = document.createElement("div");
              storeItem.className =
                "bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md store-item";
              storeItem.dataset.category = item.category;
              storeItem.dataset.id = item.id;
              storeItem.dataset.price = item.price;

              let itemSvg;

              switch (item.id) {
                case "hoodie":
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30,20 L70,20 L70,40 C70,40 80,35 80,60 L90,60 L90,80 L75,80 L75,90 L25,90 L25,80 L10,80 L10,60 L20,60 C20,35 30,40 30,40 Z" fill="#22c55e" />
                      <text x="50" y="65" font-family="Arial" font-size="10" fill="white" text-anchor="middle">USJ</text>
                    </svg>
                  `;
                  break;
                case "notebook":
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="20" width="60" height="70" fill="#f5f5f5" stroke="#22c55e" stroke-width="2" />
                      <rect x="20" y="20" width="60" height="10" fill="#22c55e" />
                      <line x1="30" y1="40" x2="70" y2="40" stroke="#ddd" stroke-width="1" />
                      <line x1="30" y1="50" x2="70" y2="50" stroke="#ddd" stroke-width="1" />
                      <line x1="30" y1="60" x2="70" y2="60" stroke="#ddd" stroke-width="1" />
                      <line x1="30" y1="70" x2="70" y2="70" stroke="#ddd" stroke-width="1" />
                      <text x="50" y="27" font-family="Arial" font-size="6" fill="white" text-anchor="middle">USJ NOTEBOOK</text>
                    </svg>
                  `;
                  break;
                case "waterbottle":
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M40,15 L60,15 L58,25 L42,25 Z" fill="#ccc" />
                      <path d="M42,25 L58,25 L60,85 L40,85 Z" fill="#22c55e" />
                      <path d="M45,35 C45,35 50,38 55,35 L55,75 C55,75 50,72 45,75 Z" fill="#f5f5f5" opacity="0.3" />
                      <text x="50" y="55" font-family="Arial" font-size="6" fill="white" text-anchor="middle">USJ</text>
                    </svg>
                  `;
                  break;
                case "totebag":
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25,30 L75,30 L80,90 L20,90 Z" fill="#eee" stroke="#22c55e" stroke-width="2" />
                      <path d="M30,30 C30,30 30,15 50,15 C70,15 70,30 70,30" fill="none" stroke="#22c55e" stroke-width="2" />
                      <text x="50" y="60" font-family="Arial" font-size="10" fill="#22c55e" text-anchor="middle">USJ</text>
                      <text x="50" y="70" font-family="Arial" font-size="5" fill="#22c55e" text-anchor="middle">SUSTAINABILITY</text>
                    </svg>
                  `;
                  break;
                case "penset":
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <line x1="30" y1="30" x2="70" y2="30" stroke="#22c55e" stroke-width="8" stroke-linecap="round" />
                      <line x1="25" y1="45" x2="65" y2="45" stroke="#15803d" stroke-width="8" stroke-linecap="round" />
                      <line x1="35" y1="60" x2="75" y2="60" stroke="#4ade80" stroke-width="8" stroke-linecap="round" />
                      <text x="50" y="32" font-family="Arial" font-size="4" fill="white" text-anchor="middle">USJ</text>
                      <text x="45" y="47" font-family="Arial" font-size="4" fill="white" text-anchor="middle">USJ</text>
                      <text x="55" y="62" font-family="Arial" font-size="4" fill="white" text-anchor="middle">USJ</text>
                    </svg>
                  `;
                  break;
                case "cap":
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20,50 C20,40 35,25 50,25 C65,25 80,40 80,50 L75,65 C70,68 65,70 50,70 C35,70 30,68 25,65 Z" fill="#22c55e" />
                      <path d="M20,50 L25,65" fill="none" stroke="#15803d" stroke-width="1" />
                      <path d="M80,50 L75,65" fill="none" stroke="#15803d" stroke-width="1" />
                      <path d="M25,65 L75,65" fill="none" stroke="#15803d" stroke-width="1" />
                      <circle cx="50" cy="40" r="8" fill="white" />
                      <text x="50" y="43" font-family="Arial" font-size="8" fill="#22c55e" text-anchor="middle">USJ</text>
                    </svg>
                  `;
                  break;
                default:
                  itemSvg = `
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <rect x="25" y="25" width="50" height="50" fill="#22c55e" />
                      <text x="50" y="55" font-family="Arial" font-size="10" fill="white" text-anchor="middle">USJ</text>
                    </svg>
                  `;
              }

              // Popular badge
              const popularBadge = item.popular
                ? `
                <div class="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Popular
                </div>
              `
                : "";

              storeItem.innerHTML = `
                <div class="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                  ${itemSvg}
                  ${popularBadge}
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-lg mb-1">${item.name}</h3>
                  <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center text-primary-600 dark:text-primary-400 font-bold">
                      <i class="bx bx-coin mr-1"></i>
                      <span>${item.price}</span>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      In stock
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    ${item.description}
                  </p>
                  <button class="add-to-cart w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
                    Add to Cart
                  </button>
                </div>
              `;

              storeItemsContainer.appendChild(storeItem);
            });

            // Add event listeners to the newly created add-to-cart buttons
            document.querySelectorAll(".add-to-cart").forEach((button) => {
              button.addEventListener("click", function () {
                const item = this.closest(".store-item");
                const itemId = item.getAttribute("data-id");
                const itemPrice = parseInt(item.getAttribute("data-price"));
                const itemName = item.querySelector("h3").textContent;

                // Check if item is already in cart
                const existingItemIndex = appState.cart.findIndex(
                  (cartItem) => cartItem.id === itemId
                );

                if (existingItemIndex >= 0) {
                  // Increment quantity if item already in cart
                  appState.cart[existingItemIndex].quantity += 1;
                } else {
                  // Add new item to cart
                  appState.cart.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                  });
                }

                // Update cart UI
                updateCartUI();

                // Button animation
                button.classList.add("cart-bounce");
                setTimeout(() => {
                  button.classList.remove("cart-bounce");
                }, 500);
              });
            });
          }

          // Clear cart functionality
          clearCartBtn.addEventListener("click", function () {
            appState.cart = [];
            updateCartUI();
          });

          // Checkout functionality
          checkoutBtn.addEventListener("click", function () {
            const totalAmount = calculateCartTotal();

            // Check if user has enough balance
            if (appState.userBalance >= totalAmount) {
              // Deduct from balance
              appState.userBalance -= totalAmount;
              updateBalanceDisplays();

              // Create transaction records
              const now = new Date();
              const formattedDate = `Apr ${now.getDate()}, 2025`;
              const formattedTime = `${now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}`;

              appState.cart.forEach((item) => {
                const newTransaction = {
                  id: appState.transactions.length + 1,
                  date: formattedDate,
                  description: `${item.name} Purchase`,
                  category: "Store",
                  amount: -item.price * item.quantity,
                  type: "spending",
                  status: "Completed",
                  time: formattedTime,
                };

                appState.transactions.unshift(newTransaction);
              });

              // Update transaction displays
              updateTransactionDisplays();

              // Show success message
              showSuccessModal(
                "Purchase Complete!",
                "Your items have been successfully purchased."
              );

              // Clear cart
              appState.cart = [];
              updateCartUI();
            } else {
              // Show insufficient funds message
              showSuccessModal(
                "Insufficient Funds",
                "You don't have enough SCUDO to complete this purchase."
              );
            }
          });

          // Update cart UI based on app state
          function updateCartUI() {
            if (appState.cart.length === 0) {
              emptyCart.classList.remove("hidden");
              filledCart.classList.add("hidden");
              return;
            }

            emptyCart.classList.add("hidden");
            filledCart.classList.remove("hidden");

            // Clear current cart items
            cartItems.innerHTML = "";

            // Add cart items
            appState.cart.forEach((item) => {
              const itemElement = document.createElement("div");
              itemElement.className = "flex justify-between items-center py-2";
              itemElement.innerHTML = `
                <div class="flex items-center">
                  <div class="p-2 mr-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <i class="bx bx-shopping-bag text-primary-600 dark:text-primary-400"></i>
                  </div>
                  <div>
                    <p class="font-medium">${item.name}</p>
                    <div class="flex items-center">
                      <span class="text-xs text-gray-500 dark:text-gray-400">Qty: ${
                        item.quantity
                      }</span>
                      <button class="remove-item ml-2 text-red-500 hover:text-red-700 text-xs" data-id="${
                        item.id
                      }">
                        <i class="bx bx-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex items-center text-primary-600 dark:text-primary-400 font-bold">
                  <i class="bx bx-coin mr-1"></i>
                  <span>${item.price * item.quantity}</span>
                </div>
              `;

              cartItems.appendChild(itemElement);
            });

            // Add event listeners to remove buttons
            document.querySelectorAll(".remove-item").forEach((button) => {
              button.addEventListener("click", function () {
                const itemId = this.getAttribute("data-id");
                appState.cart = appState.cart.filter(
                  (item) => item.id !== itemId
                );
                updateCartUI();
              });
            });

            // Update cart total
            cartTotal.textContent = calculateCartTotal();
          }

          // Calculate cart total
          function calculateCartTotal() {
            return appState.cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
          }
        }

        // Invest section initialization
        function initInvest() {
          const projectsContainer =
            document.getElementById("projectsContainer");
          const investModal = document.getElementById("investModal");
          const closeInvestModal = document.getElementById("closeInvestModal");
          const cancelInvestBtn = document.getElementById("cancelInvestBtn");
          const confirmInvestBtn = document.getElementById("confirmInvestBtn");
          const investAmount = document.getElementById("investAmount");
          const currentBalanceDisplay = document.getElementById(
            "currentBalanceDisplay"
          );
          const afterInvestmentDisplay = document.getElementById(
            "afterInvestmentDisplay"
          );
          const investModalTitle = document.getElementById("investModalTitle");

          let activeProject = null;

          // Populate projects
          populateProjects();

          // Close modal events
          closeInvestModal.addEventListener("click", () =>
            investModal.classList.add("hidden")
          );
          cancelInvestBtn.addEventListener("click", () =>
            investModal.classList.add("hidden")
          );

          // Investment amount input
          investAmount.addEventListener(
            "input",
            updateInvestmentBalanceDisplay
          );

          // Update balance displays in modal
          function updateInvestmentBalanceDisplay() {
            const amount = parseInt(investAmount.value) || 0;
            currentBalanceDisplay.textContent = `${appState.userBalance} SCUDO`;
            afterInvestmentDisplay.textContent = `${
              appState.userBalance - amount
            } SCUDO`;
          }

          // Populate projects
          function populateProjects() {
            projectsContainer.innerHTML = "";

            const projects = [
              {
                id: "magis",
                name: "Community Garden Project",
                club: "MAGIS",
                clubDesc: "Youth Service Club",
                color: "blue",
                gradient: "from-blue-500 to-violet-500",
                current: appState.projectData.magis.current,
                total: appState.projectData.magis.total,
                supporters: appState.projectData.magis.supporters,
                daysLeft: 18,
                description:
                  "Help us create a sustainable garden that will provide fresh produce for the community food bank.",
              },
              {
                id: "aumonerie",
                name: "Interfaith Dialogue Series",
                club: "AUMONERIE",
                clubDesc: "Spiritual Life",
                color: "amber",
                gradient: "from-amber-500 to-red-500",
                current: appState.projectData.aumonerie.current,
                total: appState.projectData.aumonerie.total,
                supporters: appState.projectData.aumonerie.supporters,
                daysLeft: 12,
                description:
                  "Supporting a monthly dialogue series bringing together students from different religious backgrounds.",
              },
              {
                id: "07jour",
                name: "Sustainability Documentary",
                club: "07 JOUR",
                clubDesc: "Media & Communication",
                color: "green",
                gradient: "from-green-500 to-emerald-500",
                current: appState.projectData["07jour"].current,
                total: appState.projectData["07jour"].total,
                supporters: appState.projectData["07jour"].supporters,
                daysLeft: 25,
                description:
                  "Creating a documentary highlighting sustainability initiatives at USJ and their impact on campus life.",
              },
              {
                id: "fssocial",
                name: "SCUDOnce Fair for Schools",
                club: "FS SOCIAL",
                clubDesc: "Faculty of SCUDOnce",
                color: "purple",
                gradient: "from-purple-500 to-indigo-500",
                current: appState.projectData.fssocial.current,
                total: appState.projectData.fssocial.total,
                supporters: appState.projectData.fssocial.supporters,
                daysLeft: 9,
                description:
                  "Organizing a SCUDOnce fair for local school students to increase interest in STEM fields.",
              },
            ];

            projects.forEach((project) => {
              const percentage = Math.min(
                100,
                Math.round((project.current / project.total) * 100)
              );

              const projectElement = document.createElement("div");
              projectElement.className =
                "bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md";
              projectElement.innerHTML = `
                <div class="h-40 bg-gradient-to-r ${project.gradient} relative">
                  <div class="absolute inset-0 flex items-center justify-center text-white">
                    <div class="text-center">
                      <div class="text-3xl font-bold mb-1">${project.club}</div>
                      <div class="text-sm opacity-90">${project.clubDesc}</div>
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-lg mb-2">${project.name}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${project.description}</p>
                  <div class="mb-3">
                    <div class="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span class="font-medium" id="${project.id}Funding">${project.current} / ${project.total}</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div class="bg-${project.color}-600 h-2.5 rounded-full" id="${project.id}Progress" style="width: ${percentage}%"></div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center mb-3">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      <i class="bx bx-time-five"></i> ${project.daysLeft} days left
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      <i class="bx bx-user"></i>
                      <span id="${project.id}Supporters">${project.supporters}</span> supporters
                    </div>
                  </div>
                  <button class="support-project w-full bg-${project.color}-600 hover:bg-${project.color}-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    data-project="${project.id}"
                    data-name="${project.name}"
                    data-color="${project.color}"
                    data-current="${project.current}"
                    data-supporters="${project.supporters}">
                    Support Project
                  </button>
                </div>
              `;

              projectsContainer.appendChild(projectElement);
            });

            // Add event listeners to support project buttons
            document.querySelectorAll(".support-project").forEach((button) => {
              button.addEventListener("click", function () {
                const projectId = this.getAttribute("data-project");
                const projectName = this.getAttribute("data-name");
                const projectColor = this.getAttribute("data-color");
                const currentFunding = parseInt(
                  this.getAttribute("data-current")
                );
                const currentSupporters = parseInt(
                  this.getAttribute("data-supporters")
                );

                // Store active project
                activeProject = {
                  id: projectId,
                  name: projectName,
                  color: projectColor,
                  currentFunding: currentFunding,
                  supporters: currentSupporters,
                };

                // Update modal
                investModalTitle.textContent = `Support ${projectName}`;
                investModalTitle.className = `text-xl font-bold text-${projectColor}-600`;

                // Reset amount
                investAmount.value = 100;

                // Update balance displays
                updateInvestmentBalanceDisplay();

                // Show modal
                investModal.classList.remove("hidden");
              });
            });

            // Update investment list
            updateInvestmentList();
          }

          // Confirm investment
          confirmInvestBtn.addEventListener("click", function () {
            const amount = parseInt(investAmount.value) || 0;

            // Validate amount
            if (amount < 10 || amount > 1000) {
              showSuccessModal(
                "Invalid Amount",
                "Please enter an amount between 10 and 1,000 SCUDO."
              );
              return;
            }

            // Check if user has enough balance
            if (amount > appState.userBalance) {
              showSuccessModal(
                "Insufficient Funds",
                "You don't have enough SCUDO for this investment."
              );
              return;
            }

            // Process investment
            appState.userBalance -= amount;
            updateBalanceDisplays();

            // Update project data
            const newFunding = activeProject.currentFunding + amount;
            const newSupporters = activeProject.supporters + 1;
            const totalFunding = appState.projectData[activeProject.id].total;
            const newPercentage = Math.min(
              100,
              Math.round((newFunding / totalFunding) * 100)
            );

            // Update UI for the project
            document.getElementById(
              `${activeProject.id}Funding`
            ).textContent = `${newFunding} / ${totalFunding}`;
            document.getElementById(
              `${activeProject.id}Progress`
            ).style.width = `${newPercentage}%`;
            document.getElementById(
              `${activeProject.id}Supporters`
            ).textContent = newSupporters;

            // Update data attributes for next investment
            const projectButton = document.querySelector(
              `[data-project="${activeProject.id}"]`
            );
            projectButton.setAttribute("data-current", newFunding);
            projectButton.setAttribute("data-supporters", newSupporters);

            // Update app state
            appState.projectData[activeProject.id].current = newFunding;
            appState.projectData[activeProject.id].supporters = newSupporters;

            // Check if project already in investments
            const existingInvestmentIndex = appState.investments.findIndex(
              (inv) => inv.project === activeProject.id
            );

            if (existingInvestmentIndex >= 0) {
              // Update existing investment
              appState.investments[existingInvestmentIndex].amount += amount;
            } else {
              // Add new investment
              const projectNameParts = activeProject.name.split(" ");
              const projectDisplay =
                projectNameParts.length > 1
                  ? projectNameParts[0] + " " + projectNameParts[1].charAt(0)
                  : projectNameParts[0];

              appState.investments.push({
                id: appState.investments.length + 1,
                project: activeProject.id,
                name: projectDisplay,
                description: activeProject.name,
                amount: amount,
                letter: projectDisplay.charAt(0),
              });
            }

            // Add transaction record
            const now = new Date();
            const formattedDate = `Apr ${now.getDate()}, 2025`;
            const formattedTime = `${now.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}`;

            const newTransaction = {
              id: appState.transactions.length + 1,
              date: formattedDate,
              description: `${activeProject.name} Investment`,
              category: "Investment",
              amount: -amount,
              type: "investment",
              status: "Completed",
              time: formattedTime,
            };

            appState.transactions.unshift(newTransaction);

            // Update UI
            updateInvestmentList();
            updateTransactionDisplays();
            updateRecentTransactions();

            // Show success message
            showSuccessModal(
              "Investment Complete!",
              `You have successfully invested ${amount} SCUDO in the ${activeProject.name} project.`
            );

            // Close modal
            investModal.classList.add("hidden");
          });

          // Update investment list
          function updateInvestmentList() {
            const investmentList = document.getElementById("investmentList");
            const totalInvested = document.getElementById("totalInvested");
            const projectsSupported =
              document.getElementById("projectsSupported");
            const investBalance = document.getElementById("investBalance");

            // Update balance
            investBalance.textContent = appState.userBalance;

            // Clear current investments
            investmentList.innerHTML = "";

            if (appState.investments.length === 0) {
              const emptyInvestment = document.createElement("div");
              emptyInvestment.className = "text-center py-3";
              emptyInvestment.innerHTML = `
                <p class="text-gray-500 dark:text-gray-400">No investments yet</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Support a project to get started</p>
              `;
              investmentList.appendChild(emptyInvestment);
            } else {
              // Add investments
              appState.investments.forEach((investment) => {
                const projectInfo = getProjectColor(investment.project);
                const investmentElement = document.createElement("div");
                investmentElement.className =
                  "p-3 border border-gray-200 dark:border-gray-700 rounded-lg";
                investmentElement.innerHTML = `
                  <div class="flex justify-between items-start">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-gradient-to-r ${projectInfo.gradient} flex items-center justify-center text-white text-xs mr-2">${investment.letter}</div>
                      <div>
                        <p class="font-medium">${investment.name}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${investment.description}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold">${investment.amount}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Invested</p>
                    </div>
                  </div>
                `;
                investmentList.appendChild(investmentElement);
              });
            }

            // Update totals
            const total = appState.investments.reduce(
              (sum, inv) => sum + inv.amount,
              0
            );
            totalInvested.textContent = total;
            projectsSupported.textContent = appState.investments.length;
          }

          // Helper function to get project color and gradient
          function getProjectColor(projectId) {
            switch (projectId) {
              case "magis":
                return {
                  color: "blue",
                  gradient: "from-blue-500 to-violet-500",
                };
              case "aumonerie":
                return {
                  color: "amber",
                  gradient: "from-amber-500 to-red-500",
                };
              case "07jour":
                return {
                  color: "green",
                  gradient: "from-green-500 to-emerald-500",
                };
              case "fssocial":
                return {
                  color: "purple",
                  gradient: "from-purple-500 to-indigo-500",
                };
              default:
                return {
                  color: "primary",
                  gradient: "from-primary-500 to-primary-600",
                };
            }
          }
        }

        // Transactions section initialization
        function initTransactions() {
          const transactionTypeFilter = document.getElementById(
            "transactionTypeFilter"
          );
          const transactionPeriodFilter = document.getElementById(
            "transactionPeriodFilter"
          );
          const transactionTableBody = document.getElementById(
            "transactionTableBody"
          );

          // Filter change events
          transactionTypeFilter.addEventListener(
            "change",
            updateTransactionTable
          );
          transactionPeriodFilter.addEventListener(
            "change",
            updateTransactionTable
          );

          // Update transaction table based on filters
          function updateTransactionTable() {
            const typeFilter = transactionTypeFilter.value;
            const periodFilter = transactionPeriodFilter.value;

            // Clear current table
            transactionTableBody.innerHTML = "";

            // If no transactions, show empty state
            if (appState.transactions.length === 0) {
              const emptyRow = document.createElement("tr");
              emptyRow.innerHTML = `
                <td colspan="5" class="px-6 py-8 text-center">
                  <div class="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                    <i class="bx bx-transfer-alt text-2xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                  <p class="text-gray-500 dark:text-gray-400">No transactions found</p>
                  <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Start recycling to earn SCUDO</p>
                </td>
              `;
              transactionTableBody.appendChild(emptyRow);
              return;
            }

            // Filter transactions
            let filteredTransactions = appState.transactions;

            if (typeFilter !== "all") {
              filteredTransactions = filteredTransactions.filter(
                (t) => t.type === typeFilter
              );
            }

            // Period filtering would be implemented here
            // This is a simplified version

            // Add transaction rows
            filteredTransactions.forEach((transaction) => {
              const row = document.createElement("tr");

              const isPositive = transaction.amount > 0;
              const amountClass = isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400";
              const amountSign = isPositive ? "+" : "";
              const iconClass = isPositive
                ? "bx-plus"
                : transaction.type === "investment"
                ? "bx-transfer"
                : "bx-minus";
              const iconBgClass = isPositive
                ? "bg-green-100 dark:bg-green-900"
                : transaction.type === "investment"
                ? "bg-blue-100 dark:bg-blue-900"
                : "bg-red-100 dark:bg-red-900";
              const iconTextClass = isPositive
                ? "text-green-600 dark:text-green-400"
                : transaction.type === "investment"
                ? "text-blue-600 dark:text-blue-400"
                : "text-red-600 dark:text-red-400";

              row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${transaction.date}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="p-2 mr-3 ${iconBgClass} rounded-lg">
                      <i class="bx ${iconClass} ${iconTextClass}"></i>
                    </div>
                    <span class="text-gray-900 dark:text-white">${transaction.description}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${transaction.category}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${amountClass}">${amountSign}${transaction.amount}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">${transaction.status}</span>
                </td>
              `;

              transactionTableBody.appendChild(row);
            });
          }

          // Initialize transaction table
          updateTransactionTable();

          // Update transaction stats
          function updateTransactionStats() {
            const transactionBalance =
              document.getElementById("transactionBalance");
            const monthlyEarnings = document.getElementById("monthlyEarnings");
            const monthlySpendings =
              document.getElementById("monthlySpendings");
            const totalTransactions =
              document.getElementById("totalTransactions");

            // Update balance
            transactionBalance.textContent = appState.userBalance;

            // Calculate totals (simplified - not filtering by actual month)
            const earnings = appState.transactions
              .filter((t) => t.type === "earning")
              .reduce((sum, t) => sum + t.amount, 0);

            const spendings = appState.transactions
              .filter((t) => t.type === "spending" || t.type === "investment")
              .reduce((sum, t) => sum + Math.abs(t.amount), 0);

            monthlyEarnings.textContent = `+${earnings}`;
            monthlySpendings.textContent = `-${spendings}`;
            totalTransactions.textContent = appState.transactions.length;
          }

          // Initialize transaction stats
          updateTransactionStats();
        }

        // Appointments section initialization
        function initAppointments() {
          const bookAppointmentBtn =
            document.getElementById("bookAppointmentBtn");
          const appointmentsList = document.getElementById("appointmentsList");
          const noAppointments = document.getElementById("noAppointments");

          // Listen for form submission
          bookAppointmentBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Get form values
            const location = document.getElementById("locationSelect").value;
            const date = document.getElementById("appointmentDate").value;
            const timeSlot = document.getElementById("timeSlotSelect").value;
            const volume = document.getElementById("volumeSelect").value;
            const notes = document.getElementById("appointmentNotes").value;

            // Simple validation
            if (!location || !date || !timeSlot || !volume) {
              showSuccessModal(
                "Missing Information",
                "Please fill out all required fields."
              );
              return;
            }

            // Format location name for display
            let locationName;
            switch (location) {
              case "cst":
                locationName = "CST - Mar Roukoz EcoHub";
                break;
              case "css":
                locationName = "CSS - Huvelin EcoHub";
                break;
              case "cls":
                locationName = "CLS - Innovation & Sport EcoHub";
                break;
              case "csm":
                locationName = "CSM - Medical SCUDOnces EcoHub";
                break;
              default:
                locationName = "USJ EcoHub";
            }

            // Format time for display
            let formattedTime;
            switch (timeSlot) {
              case "9:00":
                formattedTime = "9:00 - 10:00 AM";
                break;
              case "10:00":
                formattedTime = "10:00 - 11:00 AM";
                break;
              case "11:00":
                formattedTime = "11:00 - 12:00 PM";
                break;
              case "13:00":
                formattedTime = "1:00 - 2:00 PM";
                break;
              case "14:00":
                formattedTime = "2:00 - 3:00 PM";
                break;
              case "15:00":
                formattedTime = "3:00 - 4:00 PM";
                break;
              default:
                formattedTime = timeSlot;
            }

            // Format volume for display
            let volumeText;
            switch (volume) {
              case "small":
                volumeText = "Small (1-2 bags)";
                break;
              case "medium":
                volumeText = "Medium (3-5 bags)";
                break;
              case "large":
                volumeText = "Large (6-10 bags)";
                break;
              case "xlarge":
                volumeText = "Extra Large (10+ bags)";
                break;
              default:
                volumeText = volume;
            }

            // Format date
            const appointmentDate = new Date(date);
            const formattedDate = appointmentDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            // Create new appointment
            const newAppointment = {
              id: Date.now(),
              location: locationName,
              date: formattedDate,
              time: formattedTime,
              volume: volumeText,
              notes: notes,
              status: "Scheduled",
            };

            // Add to app state
            appState.appointments.push(newAppointment);

            // Update UI
            updateAppointmentsUI();

            // Show success modal
            showSuccessModal(
              "Appointment Scheduled",
              `Your appointment has been scheduled for ${formattedDate} at ${formattedTime}. Please arrive on time and bring your recyclables.`
            );

            // Reset form
            document.getElementById("locationSelect").selectedIndex = 0;
            document.getElementById("timeSlotSelect").selectedIndex = 0;
            document.getElementById("volumeSelect").selectedIndex = 0;
            document.getElementById("appointmentNotes").value = "";

            // Get the current date and set it as the minimum date
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0];
            document.getElementById("appointmentDate").value = formattedToday;
          });

          // Update appointments UI
          function updateAppointmentsUI() {
            if (appState.appointments.length === 0) {
              appointmentsList.classList.add("hidden");
              noAppointments.classList.remove("hidden");
              return;
            }

            // Show appointments list, hide empty state
            appointmentsList.classList.remove("hidden");
            noAppointments.classList.add("hidden");

            // Clear current list
            appointmentsList.innerHTML = "";

            // Sort appointments by date, newest first
            appState.appointments.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );

            // Add each appointment to the list
            appState.appointments.forEach((appointment) => {
              const appointmentElement = document.createElement("div");
              appointmentElement.className =
                "p-4 border border-gray-200 dark:border-gray-700 rounded-lg";

              // Determine status badge color
              let statusClass =
                "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
              if (appointment.status === "Completed") {
                statusClass =
                  "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
              } else if (appointment.status === "Cancelled") {
                statusClass =
                  "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
              }

              appointmentElement.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-medium">${appointment.location}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${
                      appointment.date
                    }</p>
                  </div>
                  <span class="px-2 py-1 text-xs font-medium rounded-full ${statusClass}">
                    ${appointment.status}
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <i class="bx bx-time mr-2"></i> ${appointment.time}
                  </div>
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <i class="bx bx-package mr-2"></i> ${appointment.volume}
                  </div>
                  ${
                    appointment.notes
                      ? `
                    <div class="flex items-start text-gray-600 dark:text-gray-400">
                      <i class="bx bx-note mt-1 mr-2"></i>
                      <span>${appointment.notes}</span>
                    </div>
                  `
                      : ""
                  }
                </div>
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <button class="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cancel-appointment" data-id="${
                    appointment.id
                  }">
                    <i class="bx bx-x mr-1"></i> Cancel
                  </button>
                  <button class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 edit-appointment" data-id="${
                    appointment.id
                  }">
                    <i class="bx bx-edit mr-1"></i> Reschedule
                  </button>
                </div>
              `;

              appointmentsList.appendChild(appointmentElement);
            });

            // Add event listeners to appointment actions
            document
              .querySelectorAll(".cancel-appointment")
              .forEach((button) => {
                button.addEventListener("click", function () {
                  const appointmentId = parseInt(this.getAttribute("data-id"));
                  const appointmentIndex = appState.appointments.findIndex(
                    (a) => a.id === appointmentId
                  );

                  if (appointmentIndex !== -1) {
                    // Mark as cancelled instead of removing
                    appState.appointments[appointmentIndex].status =
                      "Cancelled";
                    updateAppointmentsUI();

                    showSuccessModal(
                      "Appointment Cancelled",
                      "Your appointment has been cancelled. You can schedule a new appointment anytime."
                    );
                  }
                });
              });

            document.querySelectorAll(".edit-appointment").forEach((button) => {
              button.addEventListener("click", function () {
                const appointmentId = parseInt(this.getAttribute("data-id"));
                // For now, just show a modal. In a real app, we'd populate a form with the appointment details
                showSuccessModal(
                  "Reschedule Appointment",
                  "To reschedule your appointment, please cancel this one and create a new appointment with your preferred date and time."
                );
              });
            });
          }

          // Set minimum date for date picker to today
          const today = new Date();
          const formattedToday = today.toISOString().split("T")[0];
          document.getElementById("appointmentDate").min = formattedToday;
          document.getElementById("appointmentDate").value = formattedToday;

          // Initialize the appointment list
          updateAppointmentsUI();
        }

        // Account section initialization
        function initAccount() {
          const profileName = document.getElementById("profileName");
          const profileInitials = document
            .getElementById("profileInitials")
            .querySelector("span");
          const profileDepartment =
            document.getElementById("profileDepartment");
          const profileLevel = document.getElementById("profileLevel");
          const totalEarned = document.getElementById("totalEarned");
          const totalRecycled = document.getElementById("totalRecycled");
          const totalSessions = document.getElementById("totalSessions");
          const carbonReduced = document.getElementById("carbonReduced");
          const achievementsContainer = document.getElementById(
            "achievementsContainer"
          );

          const fullNameInput = document.getElementById("fullNameInput");
          const emailInput = document.getElementById("emailInput");
          const phoneInput = document.getElementById("phoneInput");
          const facultySelect = document.getElementById("facultySelect");
          const campusSelect = document.getElementById("campusSelect");

          const saveProfileBtn = document.getElementById("saveProfileBtn");
          const updatePasswordBtn =
            document.getElementById("updatePasswordBtn");

          // Set profile information
          profileName.textContent = appState.userName;
          profileInitials.textContent = getInitials(appState.userName);

          // Populate achievements
          populateAchievements();

          // Save profile button
          saveProfileBtn.addEventListener("click", function () {
            const newName = fullNameInput.value.trim();

            if (newName && newName !== appState.userName) {
              appState.userName = newName;
              profileName.textContent = newName;
              profileInitials.textContent = getInitials(newName);
              document.getElementById("userDisplayName").textContent =
                newName.split(" ")[0];
            }

            showSuccessModal(
              "Profile Updated",
              "Your profile information has been updated successfully."
            );
          });

          // Update password button
          updatePasswordBtn.addEventListener("click", function () {
            const currentPassword = document.getElementById(
              "currentPasswordInput"
            ).value;
            const newPassword =
              document.getElementById("newPasswordInput").value;
            const confirmPassword = document.getElementById(
              "confirmPasswordInput"
            ).value;

            if (!currentPassword || !newPassword || !confirmPassword) {
              showSuccessModal(
                "Missing Information",
                "Please fill out all password fields."
              );
              return;
            }

            if (newPassword !== confirmPassword) {
              showSuccessModal(
                "Password Mismatch",
                "New password and confirmation do not match."
              );
              return;
            }

            // Reset fields
            document.getElementById("currentPasswordInput").value = "";
            document.getElementById("newPasswordInput").value = "";
            document.getElementById("confirmPasswordInput").value = "";

            showSuccessModal(
              "Password Updated",
              "Your password has been updated successfully."
            );
          });

          // Helper function to get initials from name
          function getInitials(name) {
            return name
              .split(" ")
              .map((part) => part.charAt(0))
              .join("");
          }

          // Populate achievements
          function populateAchievements() {
            achievementsContainer.innerHTML = "";

            appState.achievements.forEach((achievement) => {
              const achievementElement = document.createElement("div");
              achievementElement.className = "flex flex-col items-center";
              achievementElement.innerHTML = `
                <div class="h-12 w-12 rounded-full bg-${achievement.color}-100 dark:bg-${achievement.color}-900 flex items-center justify-center mb-1">
                  <i class="bx ${achievement.icon} text-xl text-${achievement.color}-600 dark:text-${achievement.color}-400"></i>
                </div>
                <span class="text-xs text-center">${achievement.name}</span>
              `;

              achievementsContainer.appendChild(achievementElement);
            });
          }

          // Set stats (for demo purposes)
          totalEarned.textContent = "2,350";
          totalRecycled.textContent = "35.7 kg";
          totalSessions.textContent = "57";
          carbonReduced.textContent = "12.3 kg CO²";
        }

        // Help section initialization
        function initHelp() {
          const faqToggles = document.querySelectorAll(".faq-toggle");
          const faqContents = document.querySelectorAll(".faq-content");
          const volunteerForm = document.getElementById("volunteerForm");
          const volunteerSuccess = document.getElementById("volunteerSuccess");
          const contactForm = document.getElementById("contactForm");
          const viewGuidesBtn = document.getElementById("viewGuidesBtn");
          const readFaqBtn = document.getElementById("readFaqBtn");
          const contactSupportBtn =
            document.getElementById("contactSupportBtn");

          // Hide all FAQ content initially
          faqContents.forEach((content) => {
            content.style.display = "none";
          });

          // FAQ toggle functionality
          faqToggles.forEach((toggle, index) => {
            toggle.addEventListener("click", function () {
              const content = this.nextElementSibling;
              const icon = this.querySelector("i");

              if (content.style.display === "none" || !content.style.display) {
                content.style.display = "block";
                icon.classList.remove("bx-chevron-down");
                icon.classList.add("bx-chevron-up");
              } else {
                content.style.display = "none";
                icon.classList.remove("bx-chevron-up");
                icon.classList.add("bx-chevron-down");
              }
            });
          });

          // Show first FAQ item by default
          if (faqToggles.length > 0 && faqContents.length > 0) {
            faqContents[0].style.display = "block";
            const icon = faqToggles[0].querySelector("i");
            icon.classList.remove("bx-chevron-down");
            icon.classList.add("bx-chevron-up");
          }

          // Volunteer form submission
          volunteerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Hide form, show success message
            volunteerForm.classList.add("hidden");
            volunteerSuccess.classList.remove("hidden");

            // Scroll to success message
            volunteerSuccess.scrollIntoView({ behavior: "smooth" });
          });

          // Contact form submission
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            showSuccessModal(
              "Message Sent",
              "Your message has been sent to our support team. We'll get back to you as soon as possible."
            );

            // Reset form
            this.reset();
          });

          // Section navigation buttons
          viewGuidesBtn.addEventListener("click", function () {
            document
              .getElementById("faqSection")
              .scrollIntoView({ behavior: "smooth" });
          });

          readFaqBtn.addEventListener("click", function () {
            document
              .getElementById("faqSection")
              .scrollIntoView({ behavior: "smooth" });
          });

          contactSupportBtn.addEventListener("click", function () {
            document
              .getElementById("contactSection")
              .scrollIntoView({ behavior: "smooth" });
          });
        }

        // Charts initialization
        function initCharts() {
          // Activity Chart
          const activityChart = document.getElementById("activityChart");
          if (activityChart && window.Chart) {
            new Chart(activityChart, {
              type: "line",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [
                  {
                    label: "Recycling Activities",
                    data: [3, 12, 27, 15],
                    borderColor: "#22c55e",
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    fill: true,
                    tension: 0.4,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: "rgba(200, 200, 200, 0.2)",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              },
            });
          }

          // Transaction Chart
          const transactionChart = document.getElementById("transactionChart");
          if (transactionChart && window.Chart) {
            new Chart(transactionChart, {
              type: "bar",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [
                  {
                    label: "Earnings",
                    data: [120, 180, 240, 310],
                    backgroundColor: "#4CAF50",
                    borderRadius: 4,
                  },
                  {
                    label: "Spending",
                    data: [80, 100, 150, 200],
                    backgroundColor: "#F44336",
                    borderRadius: 4,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: "rgba(200, 200, 200, 0.2)",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              },
            });
          }
        }

        // Helper Functions

        // Update all balance displays across the app
        function updateBalanceDisplays() {
          document.getElementById("mobileCoinBalance").textContent =
            appState.userBalance;
          document.getElementById("sidebarCoinBalance").textContent =
            appState.userBalance;

          if (document.getElementById("investBalance")) {
            document.getElementById("investBalance").textContent =
              appState.userBalance;
          }

          if (document.getElementById("transactionBalance")) {
            document.getElementById("transactionBalance").textContent =
              appState.userBalance;
          }
        }

        // Update app state with initial values
        function updateAppState() {
          // Add sample data if needed
          if (appState.transactions.length === 0) {
            addSampleTransactions();
          }

          // Update all UI elements that depend on app state
          updateBalanceDisplays();
          updateRecentTransactions();

          // Add more updates as needed
        }

        // Update transaction displays (recent transactions and transaction table)
        function updateTransactionDisplays() {
          // Update recent transactions on home page
          updateRecentTransactions();

          // Update transaction table if visible
          if (document.getElementById("transactionTableBody")) {
            const transactionTypeFilter = document.getElementById(
              "transactionTypeFilter"
            );
            if (transactionTypeFilter) {
              const event = new Event("change");
              transactionTypeFilter.dispatchEvent(event);
            }

            // Update transaction stats
            const transactionBalance =
              document.getElementById("transactionBalance");
            const monthlyEarnings = document.getElementById("monthlyEarnings");
            const monthlySpendings =
              document.getElementById("monthlySpendings");
            const totalTransactions =
              document.getElementById("totalTransactions");

            if (
              transactionBalance &&
              monthlyEarnings &&
              monthlySpendings &&
              totalTransactions
            ) {
              // Update balance
              transactionBalance.textContent = appState.userBalance;

              // Calculate totals (simplified - not filtering by actual month)
              const earnings = appState.transactions
                .filter((t) => t.type === "earning")
                .reduce((sum, t) => sum + t.amount, 0);

              const spendings = appState.transactions
                .filter((t) => t.type === "spending" || t.type === "investment")
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);

              monthlyEarnings.textContent = `+${earnings}`;
              monthlySpendings.textContent = `-${spendings}`;
              totalTransactions.textContent = appState.transactions.length;
            }
          }
        }

        // Show success modal
        function showSuccessModal(title, message) {
          const modal = document.getElementById("successModal");
          const titleElement = document.getElementById("successTitle");
          const messageElement = document.getElementById("successMessage");
          const closeBtn = document.getElementById("successCloseBtn");

          titleElement.textContent = title;
          messageElement.textContent = message;

          modal.classList.remove("hidden");

          closeBtn.addEventListener(
            "click",
            function () {
              modal.classList.add("hidden");
            },
            { once: true }
          );
        }
      });
