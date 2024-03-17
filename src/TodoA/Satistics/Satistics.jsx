import './Satistics.css';

export default function Satistics({ tasks }) {
  const completedTasks = tasks.filter((task) => task.done);
  const percentageCompleted = Math.ceil(
    (completedTasks.length / tasks.length) * 100
  );
  return (
    <div className="tstats">
      <h1>{percentageCompleted}%</h1>
      <p>
        {completedTasks.length} / {tasks.length}
      </p>
    </div>
  );
}