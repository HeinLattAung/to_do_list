let previousEditTask = null;

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTask();
        updatestate();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks" , JSON.stringify(tasks))
}

const addTask = () => {
    const input = document.getElementById("input");
    const text = input.value.trim();

    if(text){
        if (previousEditTask !== null) {
            tasks.splice(previousEditTask.index, 0, { text: text, completed: false });
            previousEditTask = null;
        } else {
            tasks.push({ text: text, completed: false });
        }
        input.value = "";
        updateTask();
        updatestate();
        saveTasks();
    }
};

const toggleTaskCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;   
    updateTask();
    updatestate();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTask();
    updatestate();
    saveTasks();
}

const editTask = (index) => {
    const input = document.getElementById("input");
    if (previousEditTask !== null) {
        tasks[previousEditTask].text = input.value;
    }
    input.value = tasks[index].text;
    previousEditTask = { index: index, text: tasks[index]};
    tasks.splice(index, 1);
    updateTask();
    updatestate();
    saveTasks();
    document.querySelector(".input").style.color = "white";

}

const updatestate = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    console.log(progressBar);
    document.getElementById("number").innerText = `${completedTasks} / ${totalTasks}`
    progressBar.style.width = `${progress}%`;
    if (completedTasks === totalTasks && totalTasks !== 0) {
        blaskConfetti();
    }
}


const updateTask = () => {
    const taskList = document.getElementById("task_list");
    taskList.innerHTML = "";

    tasks.forEach((task ,index)  => {
        const listitem = document.createElement("li");
        listitem.innerHTML =`
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png"  onClick="editTask(${index})"/>
                <img src="./img/bin.png" class="BinImg" onClick="deleteTask(${index})"/>  
        </div>
        `;
        listitem.addEventListener("change", () => toggleTaskCompleted(index));
        taskList.appendChild(listitem);
    });
};

 document.getElementById("add").addEventListener("click", function (e) {
    e.preventDefault()
    addTask()
});

const blaskConfetti = () => {
    const count = 200;
    defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        })
    );
 }
    fire(0.25, {
        spread: 26,
        startVocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}