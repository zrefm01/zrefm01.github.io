document.querySelectorAll('.dropdown-header').forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isOpen = content.classList.contains('show');

                this.classList.toggle('open', !isOpen);

                document.querySelectorAll('.dropdown-content').forEach(el => {
                    if (el !== content) {
                        el.style.maxHeight = null;
                        el.classList.remove('show');
                        el.previousElementSibling.classList.remove('open');
                    }
                });

                if (isOpen) {
                    content.style.maxHeight = null;
                    content.classList.remove('show');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.classList.add('show');
                }
            });
        });

        const images = [
            'images/background.jpg',
            'https://media.licdn.com/dms/image/C4E03AQFtNzRNd7LdIw/profile-displayphoto-shrink_800_800/0/1598358212160?e=1727308800&v=beta&t=3HquCpHb-OGylWNAU76FjeTULO1V-jx8hqwdbFlNL74'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            const dotsScript = document.createElement('script');
            dotsScript.src = "dots2.js";
            document.body.appendChild(dotsScript);
        }