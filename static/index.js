// import constant from '/constant.json' assert { type: 'json' };defaultStroageMeger
(async () => {
    let { protocol, host, search, origin } = location
    let { v, f, m } = Object.fromEntries(new URLSearchParams(search))
    let { dataOptionsNomarl, websocket, resourceRouter, demoDebug, flexibleSize, constantString: { flagString, alertString, classString, styleString }, themes, timer, numberSnippet, defaultStroageMeger } = await fetch("/constant").then(resp => resp.json())
    function sorted(attr, convert, reverse = false) {
        let fn = Function("v", `return v${attr}`)
        let callback = (x, y) => {
            x = convert(fn(x)); y = convert(fn(y));
            return (reverse && (x - y)) || (y - x)
        }
        let { sort, slice, toSorted } = Array.prototype
        return toSorted?.call(this, callback) || sort.call(slice.call(this), callback)
    }
    function uniqueObjectsByKey(arrLike, key) {
        const s = new Set();
        return arrLike.filter(({ value }) => {
            const n = value[key];
            return !s.has(n) ? s.add(n) : null
        });
    }

    let vm = new Vue({
        data: {
            overlay: {
                pics: false,
                error: false,
                serial: false,
                history: false,
                magnet: false,
                reflow: false,
                // isfloat: false,
                proxies: false,
                sidenav: false,
                dashboard: false,
                comment: false
            },
            fragment: {
                size: dataOptionsNomarl.fragment.size,
                idx: dataOptionsNomarl.fragment.idx
            },
            chat: {
                overlay: {
                    textSwitch: false
                },
                textMessage: '',
                group: [],
                state: dataOptionsNomarl.chat.state,
                enable: false,
                session: '',
                socket: null,
                mediaRecorder: null,
                voiceChunks: []
            },
            main: {
                page: 0,
                actors: dataOptionsNomarl.main.actors,
                log: dataOptionsNomarl.main.log,
                select: dataOptionsNomarl.main.select,
                review: dataOptionsNomarl.main.review,
                state: dataOptionsNomarl.main.state,
                error: '',
                serial: '',
                keyWord: '',
                filterFactor: '',
                dbsort: dataOptionsNomarl.main.dbsort,
                dbsortsb: dataOptionsNomarl.main.dbsortsb,
                dbsortvst: dataOptionsNomarl.main.dbsortvst,
                heartbeat: null,
                currboundel: null,
                sliderate: dataOptionsNomarl.main.sliderate,
                socket: null,
                reconn: true,
                reconintval: dataOptionsNomarl.main.reconintval
            },
            manual: {
                javdb: false,
                javbus: true,
                bookmark: false
            },
            status: {
                isdone: true,
                vthumb: true,
                autoview: false,
                single: false,
                star: false,
                genre: false,
                director: false,
                studio: false,
                label: false,
                actors: false,
                tags: false,
                directors: false,
                makers: false,
                publishers: false,
                series: false,
                codes: false,
                deny: false,
            },
            preview: {
                pics: [],
                picsIndex: -1,
                picsEl: null,
                viewerEl: null,
                picsSwipe: false,
                picsSwipeSize: 0,
                desktopSwipeScale: 2,
                picsFailed: '/debug.jpg',
            },
            reveal: {
                touches: 1,
                prevRevealEl: null,
            },
            resource: {
                instruction: [],
                dbbookmark: [],
                busbookmark: [],
                busTaglist: {},
                dbTaglist: {},
            },
            dynamiclist: [],
            magnet: [],
            comment: [],
            reflow: [],
            history: [],
            proxies: [],
            sconf: null,
            observer: null,
            offset: null,
            debounce: {
                nav: null,
                slide: null,
                scroll: null,
                update: null,
                observer: null,
                heartbeat: null,
                swipeInterval: null,
                prefixScroll: null,
                prefixScale: null
            },
            throttled: {
                load: null,
                press: null,
                slowSwipe: null,
            },
            demoDebug: {
                name: demoDebug.name,
                enable: demoDebug.enable,
                magnet: demoDebug.magnet,
                genre: demoDebug.genre,
                single: demoDebug.single,
                vendor: demoDebug.vendor,
                actor: demoDebug.actor,
                actorOrigin: demoDebug.actorOrigin,
                previewOrigin: demoDebug.previewOrigin
            },
            device: {
                viewWidth: 0,
                viewHeight: 0,
                isMobile: false,
                isTablet: false,
                isDesktop: false,
                destopExpandWScale: 2,
                destopExpandHScale: 1.5,
                fontSize: null,
                rootEl: null,
                os: null
            },
            archive: '',
            theme: 'normal',
            description: 'standard',
        },
        methods: {
            async selectProxy(idx) {
                if (this.status.isdone) {
                    this.status.isdone = false
                    this.overlay.reflow = false;
                    this.overlay.proxies = false;
                    this.main.log = await fetch(`${resourceRouter.toggleProxy}${idx + numberSnippet.passProxy}`).then(r => r.text())
                    this.proxies = this.snippetArray((await fetch(resourceRouter.proxies).then(resp => resp.json())).slice(numberSnippet.passProxy), numberSnippet.proxy)
                    this.status.isdone = true
                    return null
                }
                alert(alertString.selectProxy)
            },
            async updateProxy() {
                this.overlay.reflow = false;
                this.main.log = await fetch(resourceRouter.updateProxy).then(r => r.text());
            },
            flushHistory() {
                this.overlay.history = this.history.length
                this.history = Object.keys(localStorage).filter(h => h != flagString._data);
                return null
            },
            loadHistory(key) {
                let data_ = JSON.parse(localStorage.getItem(key))
                this.jumpLocation(data_['sconf']['keyWord'], data_['description'], data_["archive"])
                return null
            },
            import_() {
                if (/^[a-zA-Z]+-\d+(\s*,\s*[a-zA-Z]+-\d+)*$/.test(this.main.serial)) {
                    this.dynamiclist = []
                    this.overlay.reflow = false
                    this.overlay.serial = false
                    let serial = this.main.serial.split(',')
                    serial.forEach(k => {
                        this.main.socket.send(JSON.stringify({ type: 'SEARCH', keyWord: k, javdb: this.manual.javdb, range: [1] }))
                    })
                    this.main.log = `${flagString.import}:${serial.length}`
                    return null
                }
                alert(alertString.import_)
            },
            export_() {
                let text = this.filterRule.map(({ m }) => m.find(({ href, text: [desc] }) => /uncen/ig.test(desc) ? href : null)).map(um => um.href).join(';')
                navigator.clipboard.writeText(text)
                this.main.log = alertString.export_
                return null

            },
            toggleItem(index) {
                this.resource.instruction[index].expand = !this.resource.instruction[index].expand;
                this.resource.instruction.forEach((it, ix) => {
                    if (!(ix == index)) {
                        it.expand = false
                    }
                })
                return null
            },
            recordStart(evt) {
                this.chat.voiceChunks = []
                console.log(evt);
                evt.target.classList.toggle('bgc')
                this.chat.mediaRecorder.start()
                this.throttled.press = setTimeout(() => {
                    this.chat.mediaRecorder.stop()
                }, 1000 * 60);
                return null
            },
            recordStop(evt) {
                this.chat.mediaRecorder.stop()
                evt.target.classList.toggle('bgc')
                return clearTimeout(this.throttled.press);
            },
            // can be optimized
            search() {
                if (this.searchAction == 'abort') return this.abort()
                if (!this.status.isdone) return alert(alertString.search)
                if (this.main.socket.readyState != WebSocket.OPEN) return this.main.log = flagString.socketDisconnect
                this.reflow = [];
                this.dynamiclist = [];
                this.status.isdone = false;
                this.overlay.history = false;
                this.archive = (this.manual.javdb && 'javdb') || (this.manual.javbus && 'javbus')
                this.description = (this.status.star && 'star') || (this.status.genre && 'genre') || (this.status.studio && 'studio') || (this.status.label && 'label') || (this.status.actors && 'actors') || (this.status.tags && 'tags') || (this.status.directors && 'directors') || (this.status.directors && 'directors') || (this.status.makers && 'makers') || (this.status.publishers && 'publishers') || (this.status.series && 'series') || 'standard'
                let template = { type: 'SEARCH', star: this.status.star, genre: this.status.genre, director: this.status.director, studio: this.status.studio, label: this.status.label, actors: this.status.actors, tags: this.status.tags, directors: this.status.directors, makers: this.status.makers, publishers: this.status.publishers, series: this.status.series, codes: this.status.codes, deny: this.status.deny, javdb: this.manual.javdb, dbsorts: { dbsort: this.main.dbsort, dbsortsb: this.main.dbsortsb, dbsortvst: this.main.dbsortvst } };
                if (this.main.keyWord.includes(flagString.searchSplit)) {
                    let [keyWord, range] = this.main.keyWord.split(flagString.searchSplit);
                    range = range.split(flagString.searchPageSplit);
                    this.main.page = range.length > 1 ? range[1] : range[0]
                    this.sconf = { ...template, keyWord, range }
                    this.main.socket.send(JSON.stringify(this.sconf))
                    return null;
                }
                if (this.main.keyWord.includes(flagString.searchPageAll)) {
                    let [keyWord] = this.main.keyWord.split(flagString.searchPageAll);
                    let range = [1, Number.MAX_SAFE_INTEGER];
                    this.main.page = range[1];
                    this.sconf = { ...template, keyWord, range };
                    this.main.socket.send(JSON.stringify(this.sconf));
                    return null
                }
                // duplicate
                this.main.page = 1
                this.sconf = { ...template, keyWord: this.main.keyWord, range: [this.main.page] };
                this.main.socket.send(JSON.stringify(this.sconf))
                return null
            },
            searchGenre(k) {
                this.main.keyWord = k
                this.search()
                return null
            },
            async sleep(t) {
                return new Promise(r => {
                    setTimeout(() => {
                        r(null);
                    }, t);
                })
            },
            async loadView(v) {
                this.main.log = v.n
                this.status.isdone = false
                let view = (await fetch(`${resourceRouter.views}${v.n}`).then(resp => resp.text()));
                this.main.log = `${v.n}${flagString.logFormat}${view}`
                // vm.$set(v, 'v', parseInt(view))
                v['v'][0] = parseInt(view)
                this.main.log = flagString.done
                this.status.isdone = true
                return null
            },
            async loadViews() {
                if (!this.dynamiclist.length) return null;
                this.status.isdone = false;
                let queueView = []
                let pending = this.filterRule.filter(({ v }) => v[0] == -1)
                this.main.log = pending.length
                let fragment = this.snippetArray(pending, numberSnippet.views)
                for (let i = 0; i <= fragment.length - 1; i++) {
                    await this.sleep(timer.viewsLoadDealy);
                    fragment[i].forEach(async v => {
                        queueView.push(
                            (async () => {
                                if (v['v'] == -1) {
                                    let view = (await fetch(`${resourceRouter.views}${v.n}`).then(resp => resp.text()))
                                    this.main.log = `${v.n}${flagString.logFormat}${view}`
                                    // vm.$set(v, 'v', parseInt(view))
                                    v['v'][0] = parseInt(view)
                                    return { n: v.n, view }
                                }
                            })()
                        )
                    })
                }
                Promise.allSettled(queueView).then((ps) => {
                    // console.log(ps);
                    this.main.log = flagString.done
                    this.status.isdone = true
                })
                return null
            },
            reflowBack(n) {
                this.status.isdone = false
                this.main.socket.send(JSON.stringify({ type: 'SEARCH', keyWord: n, javdb: this.manual.javdb, range: [1] }))
                return null
            },
            reflowList() {
                this.reflow.forEach(({ value: { n } }) => {
                    this.main.socket.send(JSON.stringify({ type: 'SEARCH', keyWord: n, javdb: this.manual.javdb, range: [1] }))
                })
                return null
            },
            reflowClear() {
                this.reflow = []
                this.overlay.reflow = false
                return null
            },
            onlyPush(n, extra, idx) {
                this.dynamiclist.push({ n, ...extra })
                this.reflow.splice(idx, 1)
                return null
            },
            reset() {
                localStorage.clear()
                this.main.socket.close()
                location.href = origin
                return null
            },
            home() {
                location.href = origin
                return null
            },
            abort() {
                return this.main.socket.send(JSON.stringify({ type: 'ABORT' }))
            },
            save() {
                let page = document.documentElement.outerHTML
                let url = URL.createObjectURL(new Blob([page], { type: 'text/html' }))
                let dl = document.createElement('a')
                dl.href = url
                dl.download = this.main.keyWord
                document.body.appendChild(dl)
                dl.click()
                document.body.removeChild(dl)
                return null
            },

            jumpLocation(v, f, m) {
                return location.href = `${origin}?v=${v}&f=${f}&m=${m}`
            },
            jumpTag(v, m,) {
                this.throttled.press = setTimeout(() => {
                    v = new URL(v);
                    let paths = v.pathname.split('/');
                    v.search && (paths[2] = v.search.match(/([^?]+)$/)[0])
                    this.jumpLocation(paths[2], paths[1], m)
                }, timer.jumpTagTimeout)
            },

            cancelJump() {
                return clearTimeout(this.throttled.press)
            },
            // closure
            debouncefn(fu, delay) {
                let timerd;
                return function (...args) {
                    clearTimeout(timerd);
                    timerd = setTimeout(() => {
                        fu(...args);
                    }, delay);
                };
            },
            throttledfn(fn, delay) {
                let timerd = null;
                return function (...args) {
                    if (!timerd) {
                        fn(...args);
                        timerd = setTimeout(() => {
                            timerd = null;
                        }, delay);
                    }
                };
            },
            loadMorePage({ target }) {
                clearTimeout(this.debounce.scroll)
                this.debounce.scroll = setTimeout(() => {
                    let { clientHeight, scrollHeight, scrollTop } = target
                    let diff = scrollHeight - Math.ceil(scrollTop)
                    this.offset = Math.floor(scrollTop)
                    if (Math.abs(diff - clientHeight) <= 2 && !this.throttled.load && this.status.isdone && this.dynamiclist.length && !this.manual.bookmark) {
                        this.main.page++
                        this.status.isdone = false
                        this.main.socket.send(JSON.stringify({ ...this.sconf, range: [this.main.page] }))
                        // 防止在加载开始之前再次触发
                        this.throttled.load = setTimeout(() => {
                            this.throttled.load = null
                        }, timer.morePageInterval)
                    }
                }, timer.scrollDebounce);
                return null
            },
            snippetArray(arr, size) {
                let i, j; i = j = 0;
                const sliced = [];
                while (j <= arr.length) {
                    [j, i] = [i + size, j]
                    if (!(i == j)) {
                        sliced.push(arr.slice(i, j))
                    }
                }
                return sliced;
            },
            async openSwipe(idx, { target }) {
                this.preview.picsIndex = idx
                this.preview.picsEl = target
                this.preview.picsEl.classList.add(classString.swipe)
                await this.sleep(timer.openSwipeTimeout)
                this.preview.picsSwipe = !this.preview.picsSwipe

            },
            async closeSwipe() {
                this.preview.picsIndex = -1
                this.preview.picsSwipe = !this.preview.picsSwipe
                await this.sleep(timer.closeSwipeTimeout)
                this.preview.picsEl.classList.remove(classString.swipe)
                return null
            },
            nextSwipePics() {
                let el = this.preview.viewerEl
                el.style.transitionDuration = `${timer.swipeTransitionTimeout}ms`
                if (!el.lock) {
                    el.lock = true
                    this.preview.picsIndex++
                    this.$nextTick(() => {
                        this.debounce.swipeInterval = setTimeout(() => {
                            if (this.preview.picsIndex == (vm.preview.pics.length + 1)) {
                                el.style.transitionDuration = '0s'
                                this.preview.picsIndex = 1
                            }
                            el.lock = false
                        }, timer.swipeTransitionTimeout);
                    })
                }
                return null

            },
            prevSwipePics() {
                let el = this.preview.viewerEl
                el.style.transitionDuration = `${timer.swipeTransitionTimeout}ms`
                if (!el.lock) {
                    el.lock = true
                    this.preview.picsIndex--
                    this.$nextTick(() => {
                        this.debounce.swipeInterval = setTimeout(() => {
                            if (this.preview.picsIndex == 0) {
                                el.style.transitionDuration = '0s'
                                this.preview.picsIndex = this.preview.pics.length
                            }
                            el.lock = false
                        }, timer.swipeTransitionTimeout);
                    })
                }
            },
            expandMagnet(m) {
                this.magnet = m
                this.overlay.magnet = m.length
                return null
            },
            expandComment(c) {
                this.comment = c
                this.overlay.comment = c.length
                return null
            },
            expandPicture(i) {
                this.preview.pics = i
                this.overlay.pics = i.length
                return null
            },
            async updateBookmark(_data) {
                let df = _data.df
                this.main.log = `${this.markAction}${flagString.logFormat}${_data.n}`
                switch (this.markAction) {
                    case 'insert':
                        this.main.socket.send(JSON.stringify({ type: 'INSERT', data: _data, df }))
                        break;
                    case 'remove':
                        this.main.socket.send(JSON.stringify({ type: 'REMOVE', data: _data, df }))
                        break;
                }
                this.reveal.prevRevealEl.__recoverReveal()
                await this.sleep(timer.updateBookmarkTimeout)
                this.flushBookMark()
                return null
            },

            async flushBookMark(lock) {
                lock && (this.status.isdone = !lock)
                this.resource.dbbookmark = await fetch(resourceRouter.dbBookmark).then(resp => resp.json())
                this.resource.busbookmark = await fetch(resourceRouter.busBookmark).then(resp => resp.json())
                return null
            },
            visibNav() {
                this.overlay.sidenav = true
                clearTimeout(this.debounce.nav)
                this.debounce.nav = setTimeout(() => {
                    this.overlay.sidenav = false
                }, timer.visibilityNavBar);
                return null
            },
            connect() {
                console.log('connect');
                return new Promise(r => {
                    this.main.socket = new WebSocket(`${protocol.includes('https:') ? 'wss' : 'ws'}://${host}${websocket.main}`)
                    this.main.socket.onopen = () => {
                        r(null)
                        console.log('WebSocket OPEN');
                        this.main.socket.addEventListener('message', async ({ data }) => {
                            let message = JSON.parse(data)
                            switch (message.type) {
                                case 'PING':
                                    let data = Date.now() - parseInt(message.data)
                                    this.main.socket.send(JSON.stringify({ type: 'PONG', data }))
                                    this.main.heartbeat = data
                                    clearInterval(this.debounce.heartbeat)
                                    this.debounce.heartbeat = setInterval(() => {
                                        this.main.socket.close();
                                    }, timer.heartbeatDetectCycle)
                                    break;
                                case 'LOG':
                                    this.main.log = `${message.data.n}<==>${message.data.c}`
                                    break;
                                case 'DONE':
                                    this.main.log = message.data.m;
                                    message.data.reflow.length ? this.reflow = uniqueObjectsByKey([...this.reflow, ...message.data.reflow], 'n') : null
                                    this.status.isdone = true
                                    if (this.sconf?.keyWord) {
                                        // save history 
                                        localStorage.setItem(`${this.sconf?.keyWord}${flagString._data}`, JSON.stringify({ ...vm._data, resource: { busTaglist: null, dbTaglist: null, busbookmark: null, dbbookmark: null, instruction: null, bookmark: null } }))
                                    }
                                    break;
                                case 'ERROR':
                                    this.main.log = message.data.err
                                    break;
                                case 'START':
                                    this.main.log = message.data.m
                                    break;
                                case 'CENSORED':
                                    let inject = { ...message.data, i: message.data.i.map(pi => ({ pt: pi, loaded: false })), gs: false, vs: false, as: false }
                                    this.dynamiclist.push(inject)
                                    this.reflow.length && this.reflow.find(({ value: { n } }, idx) => (message.data.n == n) ? this.reflow.splice(idx, 1) : null)
                                    break;
                            }
                        })
                    };
                    this.main.socket.onclose = () => {
                        console.log('WebSocket CLOSE');
                        clearInterval(this.main.heartbeat)
                        if (this.main.reconn) {
                            setTimeout(this.connect, this.main.reconintval);
                        }

                    };
                    this.main.socket.onerror = (evt) => {
                        console.log('WebSocket ERROR');
                        //   this.main.reconn = false;
                        this.main.socket.close();
                    };

                })
            },
            scrollToTop(offset, behavior) {
                this.$refs.box.scrollTo({
                    top: offset || this.offset || 0,
                    behavior: behavior || flagString.scrollBehavior
                });
                return null
            },
            loadNext() {
                if (this.status.isdone && this.sconf) {
                    this.main.page++
                    this.main.socket.send(JSON.stringify({ ...this.sconf, range: [this.main.page] }))
                    this.status.isdone = false;
                } else {
                    alert(alertString.loadNext)
                }
                return null
            },
            filterCallback() {
                let conditions = [];
                !(this.main.select == 'NONE' && this.main.filterFactor) || (conditions.push('(i.n?.toLocaleLowerCase()?.includes(this.main.filterFactor))'));
                !(this.main.select == 'TIME' && (this.main.filterFactor.length == 4)) || (conditions.push('(i.d?.slice(0, 4) >= this.main.filterFactor)'));
                !this.status.single || conditions.push('(i.s?.length || -1) == this.main.actors');
                !(this.main.review == 'censored') || conditions.push('i');
                !(this.main.review == 'uncensored') || conditions.push('i?.u');
                !(this.main.review == 'revelation') || conditions.push('i?.r');
                return conditions.join(` && `)
            },
            connectDetect() {
                setInterval(() => {
                    let { connectState } = websocket
                    switch (this.main.socket.readyState) {
                        case this.main.socket.CONNECTING:
                            this.main.state = connectState.connecting
                            break;
                        case this.main.socket.OPEN:
                            this.main.state = connectState.open
                            break;
                        case this.main.socket.CLOSING:
                            this.main.state = connectState.closing
                            break;
                        case this.main.socket.CLOSED:
                            this.main.state = connectState.closed
                            break;
                    }
                }, timer.connectDetect);
                return null
            },
            initTheme() {
                let hours = new Date().getHours()
                if (themes.day.range[0] <= hours && hours <= themes.day.range[1]) {
                    this.theme = themes.day.name
                } else {
                    this.theme = themes.night.name
                }
            },
            cssTemplate(cssObject) {
                return Object.keys(cssObject).map(key => {
                    let cssStatements = [];
                    for (const [k, v] of Object.entries(cssObject[key])) {
                        cssStatements.push(`${k}:${v};`)
                    }
                    return `${key}{${cssStatements.join('')}}`
                }).join('')
            },
            thumbSucess({ target }) {
                target.classList.add(classString.loaded)
                return null
            },
            //onloadstart 
            thumbFailed() {

            },
            listenTouches() {
                window.addEventListener('touchstart', (e) => {
                    //console.log(  e.target.closest('.info-swipe-reveal'));
                    this.reveal.touches = e.touches.length
                    // 禁用缩放
                    e.touches.length >= 2 && e.preventDefault();
                }, { passive: false });
            },
            listenResize() {
                // resize被推迟至宏任务阶段,devTool无法监听数据变化
                window.addEventListener('resize', this.debouncefn(this.initDevice, timer.initSwipeDebounce))
            },
            // offsetH/W w+p+b+s ,clientH/W, w+p  windowH/W w+p+b+s  rectH/W w+p+b
            initDevice() {
                const platform = navigator.platform.toLowerCase();
                const userAgent = navigator.userAgent.toLowerCase();
                //  const { width } = document.documentElement.getBoundingClientRect()
                this.device.os = platform.includes('win') && 'Windows' || platform.includes('mac') && 'MacOS' || platform.includes('linux') && 'Linux' || 'Unknown'
                this.device.isMobile = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent) || !navigator.maxTouchPoints
                this.device.isTablet = /ipad|android/i.test(userAgent) && this.device.isMobile;
                this.device.isDesktop = !this.device.isMobile && !this.device.isTablet;
                // this.$refs.box.style.height = `${visualViewport.height}px`
                this.device.rootEl = document.documentElement;
                this.device.viewWidth = window.innerWidth;
                this.device.viewHeight = window.innerHeight;
                this.device.fontSize = this.flexible()
                this.$refs.box.style.height = `${this.device.viewHeight}px`;
                this.device.rootEl.style.fontSize = `${this.device.fontSize}px`;
                vm.$forceUpdate();
                return null
                // this.main.error = this.device.viewWidth
            },
            initReveal() {
                return
                // directive在渲染中绑定，需要等待渲染完成获取
                vm.$nextTick(() => {
                    let { width, height } = el.getBoundingClientRect()
                    el.__revealY = height
                    el.__halfY = el.__revealY / 2
                })
            },
            flexible() {
                const { viewWidth } = this.device;
                const { small, big } = flexibleSize;
                const { smallScreenWidth, largeScreenWidth } = numberSnippet;
                if (viewWidth >= smallScreenWidth && viewWidth <= largeScreenWidth) {
                    return small + ((viewWidth - smallScreenWidth) / (largeScreenWidth - smallScreenWidth)) * (big - small);
                }
                return ((viewWidth >= largeScreenWidth) && big) || ((viewWidth <= smallScreenWidth) && small)
            },
            initVueOption($data, data, overWrite = {}) {
                let _data = {
                    ...data,
                    ...overWrite
                }
                for (const key in _data) {
                    $data[key] = _data[key]
                }
                return null
            },
            initObserver() {
                // 元素可视状态的变化都将执行IntersectionObserver回调
                // observe() 属于同步任务,当存在多个observe调用时 observer callback 会在宏任务队列中执行
                this.observer = new IntersectionObserver((entries, observer) => {
                    // entries.length 并不等于被监听的总数,活动周期内的处于交叉状态的总数
                    // console.log(`active:${entries.length}`);
                    //可能出现多个监听元素同时出现
                    entries.forEach(async ({ target, isIntersecting }) => {
                        // console.log(target, isIntersecting);
                        if (isIntersecting) {
                            !(target.src == target.dataset.src) && target.setAttribute('src', target.dataset.src)
                            let v = this.status.autoview && this.filterRule[target.dataset.i]
                            if (v && (v['v'][0] == -1)) {
                                this.main.log = target.dataset.n
                                let view = await fetch(`${resourceRouter.views}${target.dataset.n}`).then(resp => resp.text());
                                v['v'][0] = parseInt(view)
                                // vm.$set(this.filterRule[target.dataset.i], 'v',[parseInt(view)] )
                            }
                            observer.unobserve(target)
                        }
                    });
                }, {
                    root: this.$refs.box,
                    rootMargin: `0px 0px 290px 0px`,
                    threshold: 0
                })
            },
            async chatDeviceRequest() {
                console.log('init');
                // await this.chatConnect()
                let stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                let devices = await navigator.mediaDevices.enumerateDevices()
                let constraints = await navigator.mediaDevices.getSupportedConstraints();
                let deviceName = navigator.userAgent;
                let tracks = stream.getAudioTracks()
                tracks.forEach(track => {
                    console.log(track);
                    let trackInfo = { id: track.id, kind: track.kind, label: track.label, muted: track.muted, enabled: track.enabled, readyState: track.readyState }
                    // console.log(track.getCapabilities());
                    // console.log(track.getSettings());
                    // console.log(track.getConstraints());
                })
                this.chat.mediaRecorder = new MediaRecorder(stream);
                this.chat.mediaRecorder.ondataavailable = (e) => {
                    (e.data.size > 0) ? this.chat.voiceChunks.push(e.data) : null
                }
                this.chat.mediaRecorder.onstop = async () => {
                    console.log(this.chat.voiceChunks);
                    const audioBlob = new Blob(this.chat.voiceChunks, { type: 'audio/wav' });
                    this.chat.socket.send(await audioBlob.arrayBuffer())
                };
                return null
                // this.chat.socket.send(JSON.stringify({ type: 'CODES', deviceName, constraints, devices, tracks, ratio: this.chat.mediaRecorder.audioBitsPerSecond }))
            },
            chatConnect() {
                return new Promise(r => {
                    // this.chatDeviceRequest()
                    this.chat.socket = new WebSocket(`${protocol.includes('https:') ? 'wss' : 'ws'}://${host}${websocket.chat}`)
                    this.chat.socket.onopen = () => {
                        r(null)
                        console.log('WebSocket OPEN');
                        this.chat.socket.addEventListener('message', async ({ data }) => {
                            console.log(data);
                            if (data instanceof Blob) {
                                const remoteAudioBlob = new Blob([data], { type: 'audio/wav' });
                                const audioBin = URL.createObjectURL(remoteAudioBlob);
                                const audioElement = new Audio(audioBin);
                                audioElement.setAttribute('controls', 1)
                                audioElement.setAttribute('autoplay', 1)
                                document.body.appendChild(audioElement);
                                return null
                            }
                            let message = JSON.parse(data);
                            switch (message.type) {
                                case 'AUTH':
                                    this.chat.session = message.UUID
                                    // localStorage.setItem('UUID',message.UUID)
                                    break;
                                case 'ONLINE':
                                    this.chat.group = message.group
                                    break;
                                case 'TEXT':
                            }
                        })
                    };
                    this.chat.socket.onclose = () => {
                        console.log('WebSocket CLOSE');
                        // if (this.main.reconn) {
                        // setTimeout(this.chatConnect, reconintval);
                        // }
                    };
                    this.chat.socket.onerror = (evt) => {
                        console.log('WebSocket ERROR');
                        //   this.main.reconn = false;
                        this.chat.socket.close();
                    };
                })
            },
        },
        filters: {
            actorTotal(v) {
                return v?.length || -1
            },
            extractParma(v, o) {
                v = (v && /\?/.test(v)) ? v.match(/([^?]+)$/)[0] : v.match(/([^/]+)$/)[0]
                return o ? (o?.[v] ?? v) : v
            },
            getProgress(v) {
                return v?.filter(({ loaded }) => (loaded == true))?.length ?? 0
            },
            purgeSuffix(v) {
                return v?.replace(flagString._data, '')
            },
            viemTemplate(v) {
                return (v == -1 && flagString.viewEmpty) || v
            },
            uniqueKey(v) {
                return `${Date.now()}`
            },
            lastSuffix(v, len) {
                return (v >= len - numberSnippet.endFlag) && `${v}${flagString.endFlag}` || v
            },
        },
        directives: {
            // v-for > v-bind 
            lazyLoadOberver: {
                bind(el, binding, vnode) {
                    // vnode.context.observer.observe(el)
                },
                inserted(el, binding, vnode) {
                    console.log(el.dataset.i);
                    console.log(t++);
                    // vnode.context.observer.observe(el)
                }
            },
            pressAutoScroll: {
                bind(el, binding) {
                    let vm = binding.value
                    el.__stopScroll = () => {
                        clearTimeout(vm.debounce.prefixScroll)
                        cancelAnimationFrame(vm.debounce.slide)
                    }
                    el.__autoScroll = ({ touches: [point] }) => {
                        vm.debounce.prefixScroll = setTimeout(() => {
                            vm.offset = Math.floor(vm.$refs.box.scrollTop)
                            let up = point['clientX'] >= window.innerHeight >> 2
                            cancelAnimationFrame(vm.debounce.slide)
                            let animateScroll = () => {
                                vm.offset += (up ? vm.main.sliderate : -vm.main.sliderate)
                                vm.scrollToTop(null, flagString.autoScrollBehavior)
                                vm.debounce.slide = requestAnimationFrame(animateScroll)
                            }
                            animateScroll()
                        }, timer.invokeAutoScroll)
                    }
                    el.addEventListener("touchstart", el.__autoScroll, { passive: true })
                    el.addEventListener("touchmove", el.__stopScroll, { passive: true })
                    el.addEventListener("touchend", el.__stopScroll)
                    el.addEventListener("touchcancel", el.__stopScroll)
                },
                unbind(el) {
                    el.removeEventListener("touchstart", el.__autoScroll)
                    el.removeEventListener("touchmove", el.__stopScroll)
                    el.removeEventListener("touchend", el.__stopScroll)
                    el.removeEventListener("touchcancel", el.__stopScroll)
                }
            },
            pressAutoScale: {
                bind(el, binding) {
                    let vm = binding.value
                    el.__startScale = (e) => {
                        e.stopPropagation();
                        vm.debounce.prefixScale = setTimeout(() => {
                            el.classList.add(classString.thumbScale)
                        }, timer.scaleThumbTimeout);
                    }
                    el.__stopScale = () => {
                        clearTimeout(vm.debounce.prefixScale)
                        el.classList.remove(classString.thumbScale)
                    }
                    el.addEventListener('touchstart', el.__startScale, { passive: true })
                    el.addEventListener('touchend', el.__stopScale, { passive: true })
                },
                unbind(el) {
                    el.removeEventListener("touchstart", el.__startScale)
                    el.removeEventListener("touchend", el.__stopScale)
                    el.removeEventListener("touchcancel", el.__stopScale)
                }
            },
            swipeCarouselPics: {
                bind(el, binding) {
                    let vm = binding.value
                    el.lock = false;
                    el.enterSwipePics = (deltaX, currentX) => {
                        clearTimeout(vm.throttled.slowSwipe)
                        // clearTimeout(vm.debounce.swipeInterval)
                        el.style.transitionDuration = `${timer.swipeTransitionTimeout}ms`
                        if (Math.abs(deltaX) >= (((el.swipeMode == 'fast') && el.threshold) || ((el.swipeMode == 'slow') && el.slowSwipe))) {
                            if (!((vm.preview.picsIndex == (vm.preview.pics.length + 1)) && (vm.preview.picsIndex == 0))) {
                                deltaX > 0 ? vm.preview.picsIndex++ : vm.preview.picsIndex--
                            }
                        }
                        vm.$nextTick(() => {
                            vm.debounce.swipeInterval = setTimeout(() => {
                                if (el.picsChangeIndex = (((vm.preview.picsIndex == vm.preview.pics.length + 1) && (deltaX >= 0)) && 1) || (((vm.preview.picsIndex == 0) && (deltaX <= 0)) && vm.preview.pics.length)) {
                                    el.style.transitionDuration = '0s'
                                    vm.preview.picsIndex = el.picsChangeIndex
                                }
                                vm.$nextTick(() => [
                                    el.lock = false
                                ])
                            }, timer.swipeTransitionTimeout);
                        })
                        el.style.transform = `translate3d(${currentX}px,0,0)`
                    }
                    el.initPicsSwipeSize = () => {
                        vm.preview.picsSwipeSize = -el.getBoundingClientRect().width
                        el.slowSwipe = Math.abs(vm.preview.picsSwipeSize / 2)
                    }
                    // moblie
                    vm.preview.viewerEl = el
                    vm.$nextTick(el.initPicsSwipeSize)
                    window.addEventListener('resize', vm.debouncefn(el.initPicsSwipeSize, timer.initSwipeDebounce))
                    el.threshold = numberSnippet.swipeThreshold
                    el.__handleTouchStart = ({ touches: [point] }) => {
                        if (!el.lock) {
                            el.touchDeltaX = 0
                            el.touchStartX = 0
                            el.style.transitionDuration = '0s'
                            el.touchCurrentX = vm.preview.picsSwipeSize * vm.preview.picsIndex;
                            el.touchStartX = point['clientX']
                            el.swipeMode = 'fast'
                            clearTimeout(vm.throttled.slowSwipe)
                            vm.throttled.slowSwipe = setTimeout(() => {
                                el.swipeMode = 'slow'
                            }, timer.swipeSlowTimeout);
                        }

                    }
                    el.__handleTouchMove = ({ touches: [point] }) => {
                        if (!el.lock) {
                            // requestAnimationFrame(()=>{
                            el.touchDeltaX = el.touchStartX - point['clientX'];
                            el.style.transform = `translate3d(${el.touchCurrentX - el.touchDeltaX}px,0,0)`
                            // })
                        }
                    }
                    el.__handleTouchEnd = () => {
                        if (!el.lock) {
                            el.lock = true
                            el.enterSwipePics(el.touchDeltaX, el.touchCurrentX)
                        }
                    }
                    el.addEventListener('touchstart', el.__handleTouchStart, { passive: true });
                    el.addEventListener('touchmove', el.__handleTouchMove, { passive: true });
                    el.addEventListener('touchend', el.__handleTouchEnd);
                    // desktop
                    el.__handleMouseDown = (e) => {
                        el.MouseDeltaX = 0
                        el.MouseStartX = 0
                        el.style.transitionDuration = '0s'
                        el.MouseCurrentX = vm.preview.picsSwipeSize * vm.preview.picsIndex;
                        el.MouseStartX = e['clientX']
                        el.addEventListener('mousemove', el.__handleMouseMove);
                        el.addEventListener('mouseleave', el.__handleMouseUpAndLeave);
                        el.swipeMode = 'fast'
                        vm.throttled.slowSwipe = setTimeout(() => {
                            el.swipeMode = 'slow'
                        }, timer.swipeSlowTimeout);
                    }
                    el.__handleMouseMove = (e) => {
                        if (!el.lock) {
                            el.MouseDeltaX = el.MouseStartX - e['clientX'];
                            el.style.transform = `translate3d(${el.MouseCurrentX - el.MouseDeltaX}px,0,0)`
                        }
                    }
                    el.__handleMouseUpAndLeave = () => {
                        el.removeEventListener('mousemove', el.__handleMouseMove)
                        el.removeEventListener('mouseleave', el.__handleMouseUpAndLeave)
                        if (!el.lock) {
                            el.lock = true
                            el.enterSwipePics(el.MouseDeltaX, el.MouseCurrentX)
                        }
                    }
                    el.addEventListener('mousedown', el.__handleMouseDown);
                    el.addEventListener('mouseup', el.__handleMouseUpAndLeave);
                },
                unbind(el) {
                    window.removeEventListener('resize', el.initPicsSwipeSize)
                    el.removeEventListener('mousedown', el.__handleMouseDown);
                    el.removeEventListener('mouseup', el.__handleMouseUpAndLeave);
                    el.removeEventListener('touchstart', el.__handleTouchStart);
                    el.removeEventListener('touchmove', el.__handleTouchMove);
                    el.removeEventListener('touchend', el.__handleTouchEnd);
                },
            },
            swipeToReveal: {
                bind(el, binding) {
                    let vm = binding.value;
                    let data = binding.arg
                    // directive在渲染中绑定，需要等待渲染完成获取
                    vm.$nextTick(() => {
                        let { height } = el.getBoundingClientRect()
                        el.__revealY = height
                        el.__halfY = el.__revealY / 2
                    })
                    el.isOpen = false
                    el.opacityCurrent = ''
                    el.__recoverReveal = function () {
                        this.style.opacity = ''
                        this.style.transform = `translate3d(0,0,0)`
                        this.isOpen = false
                    }
                    el.__focusOutline = function () {
                        this.style.borderBottomColor = styleString.focusColor;
                    }
                    el.__blurOutline = function () {
                        this.style.borderBottomColor = ''
                    }
                    el.__handleTouchStart = ({ touches: [point] }) => {
                        if (vm.reveal.touches == 1) {
                            if (vm.reveal.prevRevealEl == null) {
                                vm.reveal.prevRevealEl = el;
                            }
                            if (vm.reveal.prevRevealEl != el) {
                                vm.reveal.prevRevealEl.__blurOutline();
                                vm.reveal.prevRevealEl.__recoverReveal()
                                vm.reveal.prevRevealEl = el
                            }
                            el.__focusOutline()
                            el.touchDeltaX = 0
                            el.touchStartX = 0
                            el.touchDeltaY = 0
                            el.touchStartY = 0
                            el.touchCurrentX = 0
                            el.opacity = 0
                            el.revealing = false
                            el.style.transitionDuration = '0s'
                            el.touchStartX = point['clientX'];
                            el.touchStartY = point['clientY'];
                        }
                    }
                    el.__handleTouchMove = (e) => {
                        if (vm.reveal.touches == 1) {
                            el.touchDeltaX = el.touchStartX - e.touches[0]['clientX'];
                            el.touchDeltaY = el.touchStartY - e.touches[0]['clientY'];
                            !el.revealing && (el.slope = el.touchDeltaY / el.touchDeltaX)
                            if ((Math.abs(el.slope) <= numberSnippet.tiltFactor) || el.revealing) {
                                e.preventDefault()
                                el.opacity = ((Math.abs(el.touchDeltaX) * numberSnippet.revealOpacityFactor) / el.__revealY)
                                if (!el.isOpen && (Math.abs(el.touchDeltaX) <= el.__revealY) && (el.touchDeltaX > 0)) {
                                    el.opacityCurrent = 1 - el.opacity
                                    el.style.opacity = el.opacityCurrent
                                    el.style.transform = `translate3d(${-el.touchDeltaX}px,0,0)`
                                    el.revealing = true
                                }
                                // limit offset direction 
                                if (el.isOpen && (el.__revealY >= Math.abs(el.touchDeltaX)) && (el.touchDeltaX < 0)) {
                                    // limit offset distance 
                                    el.style.opacity = el.opacityCurrent + el.opacity
                                    el.style.transform = `translate3d(${-el.__revealY - el.touchDeltaX}px,0,0)`
                                    el.revealing = true
                                }
                            }
                        }
                    }
                    el.__handleTouchEnd = () => {
                        el.style.transitionDuration = `${timer.revealTransitionTimeout}ms`;
                        if ((el.touchDeltaX <= 0) && (Math.abs(el.touchDeltaX) >= el.__halfY)) {
                            vm.manual.javdb = true;
                            vm.main.keyWord = data.n
                        }
                        if (!el.isOpen && (el.touchDeltaX >= 0) && (Math.abs(el.touchDeltaX) >= el.__halfY) && (Math.abs(el.slope) <= numberSnippet.tiltFactor)) {
                            el.style.opacity = numberSnippet.revealOpacityFactor
                            el.style.transform = `translate3d(${-el.__revealY}px,0,0)`
                            el.isOpen = true
                        } else {
                            el.__recoverReveal()
                        }
                    }
                    el.addEventListener('touchstart', el.__handleTouchStart, { passive: true });
                    el.addEventListener('touchmove', el.__handleTouchMove, { passive: false });
                    el.addEventListener('touchend', el.__handleTouchEnd);
                },
                unbind(el) {
                    el.removeEventListener('touchstart', el.__handleTouchStart);
                    el.removeEventListener('touchmove', el.__handleTouchMove);
                    el.removeEventListener('touchend', el.__handleTouchEnd);
                }
            }
        },
        watch: {
            //push > computed > watch> list render(dom)
            filterRule: {
                handler(v) {
                    // console.log(this.$refs.monitor.length);//n
                    // dom渲染完成之后，新的事件循环之前(因涉及到dom操作，在list render之前无法获取dom，所以在nextTick中执行上一次watch的回调时的数据(此时dom已经渲染完成可被获取)
                    clearTimeout(this.debounce.observer)
                    // 数据加载+异步执行回调 导致节流超时,较大延迟节流可保证push完成后observer,但会存在图片不被加载
                    this.debounce.observer = setTimeout(async () => {
                        console.log('watch');
                        await this.$nextTick(() => {
                            // console.log(this.$refs.monitor?.length);//n+1
                            this.$refs.monitor?.forEach(this.observer.observe.bind(this.observer))
                        })
                    }, timer.observerDebounce);
                },
                deep: false
            },
            "main.filterFactor": {
                handler(v) {
                    return this.main.filterFactor = v.length >= 4 ? this.main.filterFactor.slice(0, 4) : v
                },
                deep: false
            },
            "status.star": {
                handler(v) {
                    v && (this.status.genre = !v)
                }
            },
            "status.genre": {
                handler(v) {
                    v && (this.status.star = !v)
                }
            },
            "status.actors": {
                handler(v) {
                    v && (this.status.tags = !v)
                }
            },
            "status.tags": {
                handler(v) {
                    v && (this.status.actors = !v)
                }
            },
            "preview.picsIndex": {
                handler(idx) {
                    // this.preview.picsIndex = idx >= this.preview.pics?.length ? 0 : (idx < 0 ? this.preview.pics?.length - 1 : idx);
                },
                deep: false
            },
            "fragment.idx": {
                handler(v) {
                    this.fragment.idx = v > this.pageTotal ? 1 : (v < 1 ? this.pageTotal : v);
                },
                deep: false
            },
            "overlay.pics": {
                handler(v) {
                    v && (this.overlay.reflow = !v)
                },
                deep: false
            },
            "manual.bookmark": {
                // first init dont emit watch ,sequence:computed > watch 
                async handler(v) {
                    v ? this.flushBookMark(true) : this.status.isdone = true
                }
            },
            "manual.javdb": {
                handler(v) {
                    v && (this.manual.javbus = !v)
                }
            },
            "manual.javbus": {
                handler(v) {
                    v && (this.manual.javdb = !v)
                }
            },
            "main.error": {
                handler(v) {
                    if (v) {
                        this.overlay.error = true
                        setTimeout(() => {
                            this.main.error = ''
                        }, timer.errorMessageTimeout);
                    }
                }
            }
        },
        computed: {
            // render list
            filterRule() {
                console.log('computed');
                // Function socpe window
                // let cb = Function(`return function(i){ console.log(this); return ${this.filterCallback()}}`)().bind(this)
                // generator funcation template
                let cb = Function(`return i=>${this.filterCallback()}`).call(this)
                if (this.manual.bookmark) {
                    this.$nextTick(this.scrollToTop)
                    return this.bookmarkCurrent?.filter(cb) ?? []
                }
                let reverse = this.main.filterFactor.includes(flagString.atniSortFlag) || false
                switch (this.main.select) {
                    case "NONE":
                        return this.dynamiclist.filter(cb)
                    case "TIME":
                        return sorted.call(this.dynamiclist.filter(cb), '.d', x => new Date(x).getTime(), reverse)
                    case "VIEW":
                        return sorted.call(this.dynamiclist.filter(cb), '.v[0]', x => x, reverse)
                }
            },
            sliceReflow() {
                return this.reflow.slice(this.fragment.size * (this.fragment.idx - 1), this.fragment.idx * this.fragment.size)
            },
            pageTotal() {
                let len = (this.reflow.length % this.fragment.size)
                let total = (Math.floor(this.reflow.length / this.fragment.size))
                return len ? total + 1 : total
            },
            switchTheme() {
                let style = document.createElement('style')
                let color = themes[this.theme]['color'];
                let bgcColor = themes[this.theme]['backgroundColor'];
                style.textContent = this.cssTemplate({
                    "*": {
                        "color": color,
                        "--br-color": color,
                        "--hv-color": bgcColor,
                        "background-color": bgcColor,
                        "visibility": "visible"
                    },
                    ".bookmark-action-svg path": {
                        "fill": color,
                    },
                })
                document.body.append(style)
            },
            modelAttr() {
                return this.manual.javdb ? ['actors', 'tags'] : ['star', 'genre']
            },
            markAction() {
                return this.manual.bookmark ? 'remove' : 'insert'
            },
            searchAction() {
                return this.status.isdone ? 'search' : 'abort'
            },
            taglistCurrent() {
                return this.manual.javdb ? this.resource.dbTaglist : this.resource.busTaglist
            },
            bookmarkCurrent() {
                return this.manual.javdb ? this.resource.dbbookmark : this.resource.busbookmark
            }

        },
        // hook fn dont block init 阻塞钩子函数执行，并不会阻塞vue 实例渲染
        async created() {
            console.log('created');
            // init errorHandler
            Vue.config.errorHandler = async (err, vm, info) => {
                console.log('Vue Error:', err);
                console.log('Vue Error Info:', info);
                // filters 处于渲染阶段，修改实例属性将会触发新的渲染导致循环触发errorHandler
                vm.main.error = err
            };
            // init Vue Option
            let data = JSON.parse(localStorage.getItem(`${v || ''}${flagString._data}`) ?? '{}')
            this.initVueOption(this.$data, data, defaultStroageMeger)
            // init websocket
            await this.connect();
            // await this.chatConnect();
            this.connectDetect()
            // init query data
            if (v) {
                this.main.keyWord = v
                this.status[f] = true;
                this.manual[m] = true;
                // relation websockert 
                !(this.dynamiclist.length) ? this.search() : null
            }
        },
        async mounted() {
            console.log('mounted');
            this.listenTouches()
            // init device info 
            this.listenResize()
            this.initDevice()
            // init observer
            this.initObserver()
            // init Reveal
            // this.initReveal();
            // init theme
            this.initTheme()
            // load scroll position
            this.scrollToTop()
            // init resource
            this.proxies = this.snippetArray((await fetch(resourceRouter.proxies).then(resp => resp.json())).slice(numberSnippet.passProxy), numberSnippet.proxy)
            this.resource.busTaglist = await fetch(resourceRouter.busTag).then(resp => resp.json())
            this.resource.dbTaglist = await fetch(resourceRouter.dbTag).then(resp => resp.json())
            this.resource.instruction = await fetch(resourceRouter.instruction).then(resp => resp.json())
            this.history = Object.keys(localStorage).filter(h => h != flagString._data);
            /* 
             new IntersectionObserver((entries, observer) => {
                   entries.forEach(async entry => {
                       entry.isIntersecting ?
                           this.overlay.isfloat = false :
                           this.overlay.isfloat = true
                   })
               }, {
                   rootMargin: '10px 0px 0px 0px',
                   threshold: 1
               }).observe(this.$refs.log) 
            */
        },
        updated() {
            clearTimeout(this.debounce.update)
            this.debounce.update = setTimeout(() => {
                if (this.main.socket) {
                    console.log('updated');
                    // save current 解决 v 存档被覆盖
                    localStorage.setItem(`${(v && (v == this.sconf.keyWord) && v) || ''}${flagString._data}`, JSON.stringify({ ...vm._data, resource: { busTaglist: null, dbTaglist: null, busbookmark: null, dbbookmark: null, instruction: null, bookmark: null } }))
                }
            }, timer.updateHookDebounce);
        },
    })
    vm.$mount('#box')
})()