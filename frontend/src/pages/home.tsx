import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,

    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { parseCookies } from "nookies";
import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../contexts/AuthContexts';
import { useForm } from 'react-hook-form';
import { TransactionType } from '../types/types';

const navigation = [
    { name: 'Sign out' }
]

const input = [
    { name: 'creditedAccount', label: 'Credited Account', type: 'text' },
    { name: 'value', label: '$', type: 'text' }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Home() {
    const { 'techchallenge.token': token } = parseCookies()
    const { register, handleSubmit } = useForm()
    const { user, signOut, createTransaction } = useContext(AuthContext)
    useEffect(() => {
        if (!token || token == 'undefined') {
            Router.push('/')
        }
    })

    function handleSignOut() {
        signOut()
    }

    function handleTransaction(data: TransactionType) {
        createTransaction({ ...data, debitedAccount: user?.user.user_name })
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }: any) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleSignOut()
                                                    }}
                                                    className={classNames(
                                                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            onClick={() => handleSignOut()}
                                            className={classNames(
                                                'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">Welcome, {user?.user?.user_name}.</h2>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Balance: {user?.balance}</h2>
                    </div>
                </header>
                <main>
                    <div className="mx-auto flex justify-center max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <Card className="w-96 ">
                                <CardHeader
                                    variant="gradient"
                                    className="bg-indigo-600 mb-4 grid h-28 place-items-center"
                                >
                                    <Typography variant="h3" color="white">
                                        Transaction
                                    </Typography>
                                </CardHeader>
                                <CardBody className="flex flex-col gap-4">
                                    <form onSubmit={handleSubmit(handleTransaction)}>
                                        {input.map((item) => (
                                            <div className="mb-3">
                                                <Input key={item.name} {...register(`${item.name}`)} name={item.name} label={item.label} size='lg' type={item.type} />
                                            </div>
                                        ))}
                                        <Button type="submit" className='bg-indigo-600 mt-3' fullWidth>
                                            Transfer
                                        </Button>
                                    </form>
                                </CardBody>
                                {/* <CardFooter className="pt-0">
                                </CardFooter> */}
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
