document.addEventListener("DOMContentLoaded", function(event) {
    const srcInput = document.getElementById("srcInput");
    const srcSubmit = document.getElementById("srcSubmit");
    const srcResults = document.getElementById("srcResults");
    let curSrc = false;
    let srcMouse = false;
    let srcHasResult = false;
    let srcCount = 0;
    let srcCountMax = 3;
    let srcTotalCount = 0;
    let srcMinQ = 2;
    hideSrcResult(true);

    srcSubmit.addEventListener('click', () => {
        srcSubmitClick();
    });

    srcInput.onfocus = () => {
        srcMouse = true;
        if(srcHasResult == true) {
            hideSrcResult(false);
        }
        srcInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            srcSubmitClick();
        }
});
    }

    document.onmouseup = function(e) {
        if(srcMouse == false) {
            hideSrcResult(true);
        }
    };

    srcResults.onmouseover = () => {
        srcMouse= true;
    };
     srcResults.onmouseout = () => {
        srcMouse = false;
    };

    srcInput.addEventListener('keyup', () => {
        if(srcInput.value.match(/^\s+$/) === null) { // if only whitespace
            if(srcInput.value.length >= srcMinQ) { // if search length is long enough
                if(curSrc == false) { // if live search is false
                    curSrc = true;
                    fetch('/src?q='+srcInput.value)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) { 
                        curSrc = false;
                        if(data[0] != undefined) { // if there's a return
                            srcTotalCount = 0;
                            srcCount = 0;
                            hideSrcResult(false);
                            srcHasResult = true;
                            document.getElementById("srcResults").innerHTML = '';
                            data.forEach(element => {
                                srcTotalCount ++;
                                if (srcCount < srcCountMax) {
                                    document.getElementById("srcResults").innerHTML += `<a class="srcResultList" href="product?id=${element.id}">${element.manufacturer} ${element.title}</a>`;
                                    srcCount ++;
                                }
                            });
                            if (srcTotalCount > srcCountMax) {
                                document.getElementById("srcResults").innerHTML += `<a class="srcResultMore" href="product/src?q=${srcInput.value}">Vis ${srcTotalCount - srcCount} mere</a>`;
                            }
                        } else {
                            hideSrcResult(true);
                            srcHasResult = false;
                        } 
                    });
                }
            } else {
                hideSrcResult(true);
                srcHasResult = false;
            }
        }
    });

    function hideSrcResult(hidden = true) {
        if(hidden) {
            document.getElementById("srcResults").style.visibility = "hidden";
        } else {
            document.getElementById("srcResults").style.visibility = "visible";
        }
    }

    function srcSubmitClick() {
        if(srcInput.value.length >= srcMinQ) {
            if(srcInput.value.match(/^\s+$/) === null) {
                window.location.href = `product/src?q=${srcInput.value}`;
            } else {
                alert('Din søgning er tom.');
            }
        } else {
            alert('Din søgning er for kort.');
        }
    }
});