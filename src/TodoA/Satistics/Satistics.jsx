import './Satistics.css';

export default function Satistics({ tasks }) {
  const completedTasks = tasks.filter((task) => task.done);
  const percentageCompleted = Math.ceil(
    (completedTasks.length / tasks.length) * 100
  );
  return (
    <div>
    </div>
  );
}