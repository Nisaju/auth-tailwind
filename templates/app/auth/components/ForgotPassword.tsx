import { useMutation } from "blitz"

import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword as validation } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import Logo from "app/core/components/Logo"

export default function ForgotPassword() {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const onSubmit = async (values: { email: string }) => {
    try {
      await forgotPasswordMutation(values)
    } catch (error) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
      }
    }
  }

  return (
    <div className="bg-[#ECF0F4] min-h-screen font-poppins">
      <div className="py-10">
        <div className="mt-6 lg:mt-[50px] font-sans mx-4 lg:mx-[110px]">
          <div className="w-full md:w-2/3 1-5xl:w-1/2 2xl:w-1/4 container mx-auto my-[50px] bg-white border border-[#EAEAEA] py-[58px] px-[25px] lg:px-[50px] rounded-xl">
            <Logo className="fill-[#6700eb] w-[100px] h-[50px] lg:w-[150px] lg:h-[75px] mx-auto mb-4" />
            <h1 className="font-medium text-2xl lg:text-3xl text-center text-[#19212C] font-alegreya my-4">
              Forgot your password?
            </h1>

            {isSuccess ? (
              <div>
                <h2 className="text-base lg:text-lg text-[#868B90] text-center lg:mt-1 mb-4">
                  Request Submitted
                </h2>
                <p className="text-sm lg:text-base text-[#868B90] text-center lg:mt-1 mb-4">
                  If your email is in our system, you will receive instructions to reset your
                  password shortly.
                </p>
              </div>
            ) : (
              <Form
                submitText="Send Reset Password Instructions"
                schema={validation}
                initialValues={{ email: "" }}
                onSubmit={onSubmit}
                buttonClassName="w-full py-3.5 mt-[50px] bg-[#77C5FD] text-white text-base lg:text-lg font-bold rounded-lg"
              >
                <LabeledTextField
                  name="email"
                  label="Email"
                  placeholder="Email"
                  labelClassName="text-[#868B90] text-base lg:text-lg flex flex-col"
                />
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
