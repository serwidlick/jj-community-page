import {type Component} from "solid-js";


export const Disclaimer: Component = (props) => {
  return (
    <div class={'flex flex-col px-4 pb-8 text-base md:text-xl lg:px-32 text-center text-white'}>
      <p class={'p-4'}>Once the Official Yogscast Jingle Jam schedule is published it will be shown here.</p>
      <p class={''}>
        This site <strong>is maintained by the community</strong>. If you find errors or see that a stream is missing
        use the contact info below. Streams that appear here are not guaranteed to happen or might be delayed. For more
        information visit the Jingle Jam Twitter page. This site is a{' '}
        <strong>fan Project and not associated with the Jingle Jam, the Yogscast or their partners.</strong>
      </p>
    </div>
  );
}
